import { Injectable, UnauthorizedException, BadRequestException, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { createHash } from 'crypto';
import { AuthRepository } from '../queries/auth.queries';
import { OtpPurpose } from 'prisma/src/generated/prisma-client/client';

@Injectable()
export class AuthHelper {

    private readonly OTP_EXPIRY_MINUTES = 10;
    private readonly MAX_OTP_ATTEMPTS = 3;

    constructor(private readonly authRepository: AuthRepository) { }

    /**
     * Hash password using bcrypt
     */
    async hashPassword(password: string): Promise<string> {
        const saltRounds = 10;
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
        return bcrypt.hash(code, 10);
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
        return new Date(Date.now() + this.OTP_EXPIRY_MINUTES * 60 * 1000);
    }

    /**
     * Validate user exists by email
     */
    async validateUserExistsByEmail(email: string) {
        const user = await this.authRepository.findUserByEmail(email);
        if (!user) {
            throw new NotFoundException(`User with email ${email} not found`);
        }
        return user;
    }

    /**
     * Validate user exists by username
     */
    async validateUserExistsByUsername(username: string) {
        const user = await this.authRepository.findUserByUsername(username);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        return user;
    }



    /**
     * Validate OTP and check attempts
     */
    async validateOtp(userId: string, otpCode: string, purpose: OtpPurpose) {
        const otpRecord = await this.authRepository.findValidOtpCode(userId, purpose);

        if (!otpRecord) {
            throw new BadRequestException('Invalid or expired OTP code');
        }

        // Check if max attempts exceeded
        if (otpRecord.attempts >= this.MAX_OTP_ATTEMPTS) {
            throw new BadRequestException('Maximum OTP verification attempts exceeded. Please request a new code.');
        }

        // Increment attempts
        await this.authRepository.incrementOtpAttempts(otpRecord.id);

        // Verify OTP code
        const isValid = await this.verifyOtpCode(otpCode, otpRecord.codeHash);

        if (!isValid) {
            throw new BadRequestException('Invalid OTP code');
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
        throw new BadRequestException('User is not associated with any office');
    }

    /**
     * Throw invalid credentials error
     */
    throwInvalidCredentials(): never {
        throw new UnauthorizedException('Invalid credentials');
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
        return bcrypt.hash(sha256, 10);
    }

    /**
     * Validate Refresh Token
     */
    async validateRefreshToken(token: string, hash: string): Promise<boolean> {
        const sha256 = createHash('sha256').update(token).digest('hex');
        return bcrypt.compare(sha256, hash);
    }
}
