import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { createHash } from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from '../../users/queries/users.queries';
import { AuditRepository } from '../../audit/queries/audit.queries';
import { AuthAuditEvent } from 'prisma/src/generated/prisma-client/client';

import { AUTH_MESSAGES, AUTH_CONSTANTS } from '../constants/messages.constant';

@Injectable()
export class AuthHelper {
    constructor(
        private readonly usersRepository: UsersRepository,
        private readonly auditRepository: AuditRepository,
        private readonly jwtService: JwtService,
    ) { }

    // ─── PASSWORD ─────────────────────────────────────────────────

    async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, AUTH_CONSTANTS.SALT_ROUNDS);
    }

    async verifyPassword(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }

    /**
     * Validate password and audit log if invalid.
     * Uses user.id (internal) for audit FK.
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
     * Check if password change is allowed (48h rule).
     */
    checkPasswordChangeAllowed(lastPasswordChange: Date | null) {
        if (lastPasswordChange) {
            const hoursSinceChange = (Date.now() - lastPasswordChange.getTime()) / AUTH_CONSTANTS.MILLISECONDS_PER_HOUR;
            if (hoursSinceChange < AUTH_CONSTANTS.PASSWORD_CHANGE_COOLDOWN_HOURS) {
                throw new BadRequestException(AUTH_MESSAGES.WAIT_48_HOURS);
            }
        }
    }

    // ─── USER VALIDATION ──────────────────────────────────────────

    async validateUserExistsByUsername(username: string) {
        const user = await this.usersRepository.findByUsername(username);
        if (!user) {
            throw new UnauthorizedException(AUTH_MESSAGES.INVALID_CREDENTIALS);
        }
        return user;
    }

    throwInvalidCredentials(): never {
        throw new UnauthorizedException(AUTH_MESSAGES.INVALID_CREDENTIALS);
    }

    formatUser(user: any) {
        const { passwordHash, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }

    // ─── TOKENS ───────────────────────────────────────────────────

    generateRefreshToken(): string {
        return bcrypt.genSaltSync(20);
    }

    async hashRefreshToken(token: string): Promise<string> {
        const sha256 = createHash('sha256').update(token).digest('hex');
        return bcrypt.hash(sha256, AUTH_CONSTANTS.SALT_ROUNDS);
    }

    async validateRefreshToken(token: string, hash: string): Promise<boolean> {
        const sha256 = createHash('sha256').update(token).digest('hex');
        return bcrypt.compare(sha256, hash);
    }

    /**
     * Generate JWT tokens using publicId in the payload.
     * The JWT `sub` field uses the user's publicId (UUID) — never the internal integer id.
     */
    async generateTokens(user: any) {
        const payload = { sub: user.publicId, username: user.username, roles: user.roles };
        const refreshToken = await this.jwtService.signAsync(payload, { expiresIn: AUTH_CONSTANTS.REFRESH_TOKEN_EXPIRES_IN as any });
        const refreshTokenHash = await this.hashRefreshToken(refreshToken);

        // Store refresh token hash using internal id
        await this.usersRepository.updateRefreshTokenHash(user.id, refreshTokenHash);

        const accessToken = await this.jwtService.signAsync(payload);

        return {
            access_token: accessToken,
            refresh_token: refreshToken,
        };
    }

    // ─── AUDIT ────────────────────────────────────────────────────

    /**
     * Log audit event.
     * userId is the internal integer id (FK to User table).
     */
    async logAudit(data: {
        userId?: number;
        event: keyof typeof AuthAuditEvent;
        reason?: string;
        ip?: string;
        userAgent?: string;
        deviceFingerprint?: string;
    }) {
        const eventEnum = AuthAuditEvent[data.event];
        await this.auditRepository.createAuthLog({
            userId: data.userId,
            event: eventEnum,
            reason: data.reason,
            ip: data.ip,
            deviceFingerprint: data.deviceFingerprint,
            userAgent: data.userAgent,
            country: 'Unknown',
        });
    }
}
