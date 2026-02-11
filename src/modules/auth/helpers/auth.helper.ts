import { Injectable, UnauthorizedException, BadRequestException, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { createHash } from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { AuthRepository } from '../queries/auth.queries';
import { UsersRepository } from '../../users/queries/users.queries';
import { AuditRepository } from '../../audit/queries/audit.queries';
import { OtpPurpose, AuthAuditEvent, OtpChannel } from 'prisma/src/generated/prisma-client/client';

import { AUTH_MESSAGES, AUTH_CONSTANTS } from '../constants/messages.constant';

@Injectable()
export class AuthHelper {

    private readonly OTP_EXPIRY_MINUTES = AUTH_CONSTANTS.OTP_EXPIRY_MINUTES;
    private readonly MAX_OTP_ATTEMPTS = AUTH_CONSTANTS.MAX_OTP_ATTEMPTS;

    constructor(
        private readonly authRepository: AuthRepository,
        private readonly usersRepository: UsersRepository,
        private readonly auditRepository: AuditRepository,
        private readonly jwtService: JwtService,
    ) { }

    /**
     * Hash password using bcrypt
     */
    async hashPassword(password: string): Promise<string> {
        const saltRounds = AUTH_CONSTANTS.SALT_ROUNDS;
        return bcrypt.hash(password, saltRounds);
    }

    /**
     * Verify password against hash
     */
    async verifyPassword(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }

    /**
     * Generate random OTP code (6 digits)
     */
    generateOtpCode(): string {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }

    /**
     * Hash OTP code for storage
     */
    async hashOtpCode(code: string): Promise<string> {
        return bcrypt.hash(code, AUTH_CONSTANTS.SALT_ROUNDS);
    }

    /**
     * Verify OTP code against hash
     */
    async verifyOtpCode(code: string, hash: string): Promise<boolean> {
        return bcrypt.compare(code, hash);
    }

    /**
     * Calculate OTP expiry time
     */
    getOtpExpiryTime(): Date {
        return new Date(Date.now() + this.OTP_EXPIRY_MINUTES * AUTH_CONSTANTS.MILLISECONDS_PER_MINUTE);
    }



    /**
     * Validate user exists by username
     */
    async validateUserExistsByUsername(username: string) {
        const user = await this.usersRepository.findByUsername(username);
        if (!user) {
            throw new UnauthorizedException(AUTH_MESSAGES.INVALID_CREDENTIALS);
        }
        return user;
    }



    /**
     * Validate OTP and check attempts
     */
    async validateOtp(userId: string, otpCode: string, purpose: OtpPurpose) {
        const otpRecord = await this.authRepository.findValidOtpCode(userId, purpose);

        if (!otpRecord) {
            throw new BadRequestException(AUTH_MESSAGES.INVALID_OTP);
        }

        // Check if max attempts exceeded
        if (otpRecord.attempts >= this.MAX_OTP_ATTEMPTS) {
            throw new BadRequestException(AUTH_MESSAGES.OTP_MAX_ATTEMPTS);
        }

        // Increment attempts
        await this.authRepository.incrementOtpAttempts(otpRecord.id);

        // Verify OTP code
        const isValid = await this.verifyOtpCode(otpCode, otpRecord.codeHash);

        if (!isValid) {
            throw new BadRequestException(AUTH_MESSAGES.INVALID_OTP);
        }

        return otpRecord;
    }

    /**
     * Format user response (exclude sensitive data)
     */
    formatUser(user: any) {
        const { passwordHash, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }

    /**
     * Get user's office ID (first office or owned office)
     */
    getUserOfficeId(user: any): string {
        if (user.ownedOffice) {
            return user.ownedOffice.id;
        }
        if (user.offices && user.offices.length > 0) {
            return user.offices[0].id;
        }
        throw new BadRequestException(AUTH_MESSAGES.USER_NO_OFFICE);
    }

    /**
     * Throw invalid credentials error
     */
    throwInvalidCredentials(): never {
        throw new UnauthorizedException(AUTH_MESSAGES.INVALID_CREDENTIALS);
    }

    /**
     * Generate Refresh Token (random string)
     */
    generateRefreshToken(): string {
        return bcrypt.genSaltSync(20); // Using salt gen as random string, perfectly valid for opaque tokens
    }

    /**
     * Hash Refresh Token
     */
    async hashRefreshToken(token: string): Promise<string> {
        // Pre-hash with SHA256 to handle long tokens (bcrypt has 72 byte limit)
        const sha256 = createHash('sha256').update(token).digest('hex');
        return bcrypt.hash(sha256, AUTH_CONSTANTS.SALT_ROUNDS);
    }

    /**
     * Validate Refresh Token
     */
    async validateRefreshToken(token: string, hash: string): Promise<boolean> {
        const sha256 = createHash('sha256').update(token).digest('hex');
        return bcrypt.compare(sha256, hash);
    }

    /**
     * Validate password and audit log if invalid
     */
    async validatePassword(password: string, user: any, ip: string, userAgent: string, deviceFingerprint?: string) {
        const isPasswordValid = await this.verifyPassword(password, user.passwordHash);

        if (!isPasswordValid) {
            await this.logAudit({
                userId: user.id,
                event: 'INVALID_CREDENTIALS',
                reason: 'Password mismatch',
                ip,
                userAgent,
                deviceFingerprint,
            });
            this.throwInvalidCredentials();
        }
    }

    /**
     * Check if password change is allowed (48h rule)
     */
    checkPasswordChangeAllowed(lastPasswordChange: Date | null) {
        if (lastPasswordChange) {
            const hoursSinceChange = (Date.now() - lastPasswordChange.getTime()) / AUTH_CONSTANTS.MILLISECONDS_PER_HOUR;
            if (hoursSinceChange < AUTH_CONSTANTS.PASSWORD_CHANGE_COOLDOWN_HOURS) {
                throw new BadRequestException(AUTH_MESSAGES.WAIT_48_HOURS);
            }
        }
    }

    /**
     * Log authentication audit event
     */
    async logAudit(data: { userId?: string, event: 'INVALID_CREDENTIALS' | 'INVALID_OTP' | 'LOGIN_SUCCESS' | 'PASSWORD_RESET' | 'PASSWORD_CHANGED' | 'TOKEN_REVOKED', reason?: string, ip?: string, userAgent?: string, deviceFingerprint?: string }) {
        const eventEnum = AuthAuditEvent[data.event as keyof typeof AuthAuditEvent];
        await this.auditRepository.createAuthLog({
            userId: data.userId,
            event: eventEnum,
            reason: data.reason,
            ip: data.ip,
            deviceFingerprint: data.deviceFingerprint,
            userAgent: data.userAgent,
            country: 'Unknown'
        });
    }

    /**
     * Generate and Save OTP
     */
    async generateAndSaveOtp(user: any, purpose: OtpPurpose, channel: OtpChannel, ip: string, userAgent: string) {
        const otpCode = this.generateOtpCode();
        const codeHash = await this.hashOtpCode(otpCode);
        const expiresAt = this.getOtpExpiryTime();

        // Save OTP
        await this.authRepository.createOtpCode({
            userId: user.id,
            officeId: this.getUserOfficeId(user),
            email: user.email,
            purpose,
            channel,
            codeHash,
            expiresAt,
            emailSnapshot: user.email,
            ip,
            userAgent,
        });

        console.log(`[DEV ONLY] OTP for ${user.username}: ${otpCode}`);
        return otpCode;
    }

    /**
     * Verify and Mark OTP as Used
     */
    async verifyAndUseOtp(userId: string, otp: string, purpose: OtpPurpose, ip: string, userAgent: string, deviceFingerprint?: string) {
        try {
            const otpRecord = await this.validateOtp(userId, otp, purpose);
            await this.authRepository.markOtpAsUsed(otpRecord.id);
            return otpRecord;
        } catch (error) {
            await this.logAudit({ userId, event: 'INVALID_OTP', reason: error.message, ip, userAgent, deviceFingerprint });
            throw error;
        }
    }

    /**
     * Generate Tokens and Update User
     */
    async generateTokens(user: any) {
        // Global Revocation: Generate new refresh token hash which invalidates old ones
        const payload = { sub: user.id, username: user.username, roles: user.roles };
        const refreshToken = await this.jwtService.signAsync(payload, { expiresIn: AUTH_CONSTANTS.REFRESH_TOKEN_EXPIRES_IN as any });
        const refreshTokenHash = await this.hashRefreshToken(refreshToken);

        await this.usersRepository.updateRefreshTokenHash(user.id, refreshTokenHash);

        const accessToken = await this.jwtService.signAsync(payload);

        return {
            access_token: accessToken,
            refresh_token: refreshToken,
        };
    }
}
