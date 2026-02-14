import {
    Injectable,
    BadRequestException,
    ForbiddenException,
    Logger,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { OtpRepository } from '../queries/otp.queries';
import { AuditRepository } from '../../audit/queries/audit.queries';
import { OTP_CONSTANTS, OTP_MESSAGES } from '../constants/otp.constants';
import { OtpPurpose, OtpChannel, UserStatus, AuthAuditEvent } from 'prisma/src/generated/prisma-client/client';

@Injectable()
export class OtpHelper {
    private readonly logger = new Logger(OtpHelper.name);

    constructor(
        private readonly otpRepository: OtpRepository,
        private readonly auditRepository: AuditRepository,
    ) { }

    // ─── USER VALIDATION ──────────────────────────────────────────

    /**
     * Validate that the user exists by email.
     * Throws if not found.
     */
    async validateUserByEmail(email: string) {
        const user = await this.otpRepository.findUserByEmail(email);
        if (!user) {
            throw new BadRequestException(OTP_MESSAGES.USER_NOT_FOUND);
        }
        return user;
    }

    /**
     * Get user by email. Returns user or null.
     */
    async getUserByEmail(email: string) {
        return this.otpRepository.findUserByEmail(email);
    }

    // ─── 1. USER LOCK CHECKS ──────────────────────────────────────

    /**
     * Check if user is locked.
     * - If locked_until is in the future → throw.
     * - If lock expired → auto-unlock.
     * user.id is the internal integer ID.
     */
    async checkAndHandleUserLock(user: any): Promise<void> {
        if (user.status === UserStatus.LOCKED && user.lockedUntil) {
            const now = new Date();

            if (user.lockedUntil > now) {
                await this.auditRepository.createAuthLog({
                    userId: user.id,
                    event: AuthAuditEvent.BLOCKED_ACCESS,
                    reason: 'Locked user attempted OTP request',
                });
                throw new ForbiddenException(OTP_MESSAGES.USER_LOCKED);
            }

            // Lock has expired → unlock the user
            await this.otpRepository.unlockUser(user.id);
            this.logger.log(`User ${user.publicId} auto-unlocked (lock expired).`);
        }
    }

    /**
     * Simple guard: throws if the user is currently blocked.
     * No auto-unlock — just checks the user properties.
     */
    ensureUserNotBlocked(user: any): void {
        const isBlocked = user.status === UserStatus.LOCKED
            && user.lockedUntil
            && new Date(user.lockedUntil) > new Date();

        if (isBlocked) {
            this.auditRepository.createAuthLog({
                userId: user.id,
                event: AuthAuditEvent.BLOCKED_ACCESS,
                reason: 'Blocked user attempted OTP verification',
            });
            throw new ForbiddenException(OTP_MESSAGES.USER_LOCKED);
        }
    }

    // ─── 2. RATE LIMITING ─────────────────────────────────────────

    /**
     * Enforce rate limit: max 5 OTP requests within 30 minutes.
     * userId is the internal integer ID.
     */
    async enforceRateLimit(userId: number): Promise<void> {
        const maxRequests = OTP_CONSTANTS.MAX_OTP_REQUESTS;
        const rateLimitWindowMs = OTP_CONSTANTS.RATE_LIMIT_WINDOW_MINUTES * OTP_CONSTANTS.MS_PER_MINUTE;
        const lockDurationMs = OTP_CONSTANTS.LOCK_DURATION_MINUTES * OTP_CONSTANTS.MS_PER_MINUTE;

        const windowStart = new Date(Date.now() - rateLimitWindowMs);
        const recentCount = await this.otpRepository.countRecentOtps(userId, windowStart);

        if (recentCount >= maxRequests) {
            const lockedUntil = new Date(Date.now() + lockDurationMs);
            await this.otpRepository.lockUser(userId, lockedUntil);

            await this.auditRepository.createAuthLog({
                userId,
                event: AuthAuditEvent.RATE_LIMIT_EXCEEDED,
                reason: `Exceeded ${maxRequests} OTP requests in ${OTP_CONSTANTS.RATE_LIMIT_WINDOW_MINUTES}min. Locked for ${OTP_CONSTANTS.LOCK_DURATION_MINUTES}min.`,
            });

            this.logger.warn(`User ${userId} locked: exceeded ${maxRequests} OTP requests in ${OTP_CONSTANTS.RATE_LIMIT_WINDOW_MINUTES}min.`);
            throw new ForbiddenException(OTP_MESSAGES.RATE_LIMIT_EXCEEDED);
        }
    }

    // ─── 3. EXPIRE PREVIOUS PENDING OTPS ──────────────────────────

    /**
     * Expire any previous PENDING OTP for the same purpose.
     * userId is the internal integer ID.
     */
    async expirePreviousPendingOtps(userId: number, purpose: OtpPurpose): Promise<void> {
        await this.otpRepository.expirePendingOtps(userId, purpose);
    }

    // ─── 4. GENERATE & HASH OTP ───────────────────────────────────

    /**
     * Generate a 6-digit OTP and hash it with bcrypt.
     * Returns both the raw code (for sending) and the hash (for storage).
     */
    async generateOtp(): Promise<{ rawCode: string; codeHash: string }> {
        const rawCode = this.generate6DigitCode();
        const codeHash = await bcrypt.hash(rawCode, OTP_CONSTANTS.SALT_ROUNDS);
        return { rawCode, codeHash };
    }

    /**
     * Generate a cryptographically random 6-digit OTP.
     */
    private generate6DigitCode(): string {
        const { randomInt } = require('crypto');
        return randomInt(100000, 999999).toString();
    }

    // ─── 5. SAVE OTP RECORD ───────────────────────────────────────

    /**
     * Build OTP data and save to database.
     * status = PENDING, expires_at = now + 3 min.
     * Uses internal user.id and office.id.
     */
    async saveOtpRecord(
        user: any,
        purpose: OtpPurpose,
        channel: OtpChannel,
        codeHash: string,
        ip?: string,
        userAgent?: string,
    ) {
        const expiresAt = this.getExpiryTime();
        const officeId = this.getUserOfficeId(user);

        return this.otpRepository.createOtp({
            userId: user.id,
            officeId,
            email: user.email,
            purpose,
            channel,
            codeHash,
            maxAttempts: OTP_CONSTANTS.MAX_OTP_ATTEMPTS,
            expiresAt,
            ip,
            userAgent,
            emailSnapshot: user.email,
        });
    }

    // ─── 6. MOCK NOTIFICATION ─────────────────────────────────────

    /**
     * Send OTP via Email/SMS (mock implementation).
     * Replace with real email/SMS service in production.
     */
    async sendOtpNotification(
        email: string,
        otpCode: string,
        channel: OtpChannel,
    ): Promise<void> {
        this.logger.log(`[MOCK ${channel}] OTP for ${email}: ${otpCode}`);
        // TODO: Integrate with SendGrid / Twilio / AWS SES
    }

    // ─── VERIFY OTP ───────────────────────────────────────────────

    /**
     * Full OTP verification logic.
     * Returns { userId (publicId), purpose } on success.
     */
    async validateAndVerifyOtp(
        user: any,
        otp: string,
        purpose: OtpPurpose,
    ): Promise<{ userId: string; purpose: OtpPurpose }> {
        // ── Get latest PENDING OTP ──
        const otpRecord = await this.otpRepository.findLatestPendingOtp(user.id, purpose);

        if (!otpRecord) {
            throw new BadRequestException(OTP_MESSAGES.OTP_NOT_FOUND);
        }

        // ── Check if expired ──
        if (this.isExpired(otpRecord.expiresAt)) {
            await this.otpRepository.expireOtp(otpRecord.id);
            throw new BadRequestException(OTP_MESSAGES.OTP_EXPIRED);
        }

        // ── Check if max attempts already exceeded ──
        if (this.isMaxAttemptsExceeded(otpRecord.attempts, otpRecord.maxAttempts)) {
            await this.otpRepository.blockOtp(otpRecord.id);
            await this.lockUserForDuration(user.id);
            throw new BadRequestException(OTP_MESSAGES.OTP_BLOCKED);
        }
        // ── Secure comparison + attempt handling ──
        await this.compareAndHandleAttempts(otp, otpRecord, user);

        // ── Valid → mark VERIFIED, unlock user if needed ──
        await this.otpRepository.verifyOtp(otpRecord.id);

        // Return publicId to the external world
        return { userId: user.publicId, purpose };
    }

    /**
     * Secure OTP comparison with attempt tracking.
     */
    private async compareAndHandleAttempts(otp: string, otpRecord: any, user: any): Promise<void> {
        const isValid = await bcrypt.compare(otp, otpRecord.codeHash);

        if (!isValid) {
            await this.otpRepository.incrementAttempts(otpRecord.id);
            await this.logInvalidOtpAudit(user, otpRecord);
        }

        const newAttempts = otpRecord.attempts + 1;
        const isBlocked = !isValid && this.isMaxAttemptsExceeded(newAttempts, otpRecord.maxAttempts);

        if (isBlocked) {
            await this.otpRepository.blockOtp(otpRecord.id);
            await this.lockUserForDuration(user.id);

            await this.auditRepository.createAuthLog({
                userId: user.id,
                event: AuthAuditEvent.OTP_MAX_ATTEMPTS,
                reason: `Max OTP attempts exceeded (${otpRecord.maxAttempts}/${otpRecord.maxAttempts}). Account locked.`,
                ip: otpRecord.ip,
                userAgent: otpRecord.userAgent,
                deviceFingerprint: otpRecord.deviceFingerprint,
            });

            throw new BadRequestException(OTP_MESSAGES.OTP_BLOCKED);
        }

        if (!isValid) {
            throw new BadRequestException(OTP_MESSAGES.OTP_INVALID);
        }
    }

    /**
     * Log an INVALID_OTP audit event.
     */
    private async logInvalidOtpAudit(user: any, otpRecord: any): Promise<void> {
        await this.auditRepository.createAuthLog({
            userId: user.id,
            event: AuthAuditEvent.INVALID_OTP,
            reason: `Failed OTP attempt (attempt ${otpRecord.attempts + 1}/${otpRecord.maxAttempts})`,
            ip: otpRecord.ip,
            userAgent: otpRecord.userAgent,
            deviceFingerprint: otpRecord.deviceFingerprint,
        });
    }

    // ─── PRIVATE UTILITIES ────────────────────────────────────────

    private getExpiryTime(): Date {
        return new Date(
            Date.now() + OTP_CONSTANTS.OTP_EXPIRY_MINUTES * OTP_CONSTANTS.MS_PER_MINUTE,
        );
    }

    /**
     * Get the office internal ID from the user entity.
     */
    private getUserOfficeId(user: any): number {
        if (user.ownedOffice) {
            return user.ownedOffice.id;
        }
        if (user.offices && user.offices.length > 0) {
            return user.offices[0].id;
        }
        throw new BadRequestException('User is not associated with any office.');
    }

    private isExpired(expiresAt: Date): boolean {
        return new Date() > new Date(expiresAt);
    }

    private isMaxAttemptsExceeded(attempts: number, maxAttempts: number): boolean {
        return attempts >= maxAttempts;
    }

    private async lockUserForDuration(userId: number): Promise<void> {
        const lockedUntil = new Date(
            Date.now() + OTP_CONSTANTS.LOCK_DURATION_MINUTES * OTP_CONSTANTS.MS_PER_MINUTE,
        );
        await this.otpRepository.lockUser(userId, lockedUntil);
        this.logger.warn(`User ${userId} locked for ${OTP_CONSTANTS.LOCK_DURATION_MINUTES} minutes.`);
    }
}
