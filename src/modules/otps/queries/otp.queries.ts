import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { OtpPurpose, OtpStatus, UserStatus } from 'prisma/src/generated/prisma-client/client';

@Injectable()
export class OtpRepository {
    constructor(private readonly prisma: PrismaService) { }

    // ─── OTP QUERIES ───────────────────────────────────────────────

    /**
     * Create a new OTP record.
     */
    async createOtp(data: {
        userId: string;
        officeId: string;
        email: string;
        purpose: OtpPurpose;
        channel: string;
        codeHash: string;
        maxAttempts: number;
        expiresAt: Date;
        ip?: string;
        userAgent?: string;
        emailSnapshot?: string;
    }) {
        return this.prisma.otpCode.create({
            data: {
                userId: data.userId,
                officeId: data.officeId,
                email: data.email,
                purpose: data.purpose,
                channel: data.channel as any,
                codeHash: data.codeHash,
                attempts: 0,
                maxAttempts: data.maxAttempts,
                status: OtpStatus.PENDING,
                expiresAt: data.expiresAt,
                ip: data.ip,
                userAgent: data.userAgent,
                emailSnapshot: data.emailSnapshot,
            },
        });
    }

    /**
     * Find the latest PENDING OTP for a user + purpose combination.
     */
    async findLatestPendingOtp(userId: string, purpose: OtpPurpose) {
        return this.prisma.otpCode.findFirst({
            where: {
                userId,
                purpose,
                status: OtpStatus.PENDING,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }

    /**
     * Count OTP records created by a user within a time window.
     * Used for rate-limiting (e.g., max 5 in 30 min).
     */
    async countRecentOtps(userId: string, sinceDate: Date): Promise<number> {
        return this.prisma.otpCode.count({
            where: {
                userId,
                createdAt: {
                    gte: sinceDate,
                },
            },
        });
    }

    /**
     * Expire all PENDING OTPs for a given user + purpose.
     * Called before issuing a new OTP to invalidate old ones.
     */
    async expirePendingOtps(userId: string, purpose: OtpPurpose) {
        return this.prisma.otpCode.updateMany({
            where: {
                userId,
                purpose,
                status: OtpStatus.PENDING,
            },
            data: {
                status: OtpStatus.EXPIRED,
            },
        });
    }

    /**
     * Increment the attempts counter for an OTP record.
     */
    async incrementAttempts(otpId: string) {
        return this.prisma.otpCode.update({
            where: { id: otpId },
            data: {
                attempts: {
                    increment: 1,
                },
            },
        });
    }

    /**
     * Update the status of an OTP record.
     */
    async updateOtpStatus(otpId: string, status: OtpStatus) {
        return this.prisma.otpCode.update({
            where: { id: otpId },
            data: {
                status,
                ...(status === OtpStatus.VERIFIED ? { usedAt: new Date() } : {}),
            },
        });
    }

    /**
     * Mark OTP as BLOCKED (max attempts exceeded).
     */
    async blockOtp(otpId: string) {
        return this.updateOtpStatus(otpId, OtpStatus.BLOCKED);
    }

    /**
     * Mark OTP as VERIFIED.
     */
    async verifyOtp(otpId: string) {
        return this.updateOtpStatus(otpId, OtpStatus.VERIFIED);
    }

    /**
     * Mark OTP as EXPIRED.
     */
    async expireOtp(otpId: string) {
        return this.updateOtpStatus(otpId, OtpStatus.EXPIRED);
    }

    // ─── USER LOCK/UNLOCK QUERIES ──────────────────────────────────

    /**
     * Lock a user until a specific time.
     */
    async lockUser(userId: string, lockedUntil: Date) {
        return this.prisma.user.update({
            where: { id: userId },
            data: {
                status: UserStatus.LOCKED,
                lockedUntil,
            },
        });
    }

    /**
     * Unlock a user (clear lock).
     */
    async unlockUser(userId: string) {
        return this.prisma.user.update({
            where: { id: userId },
            data: {
                status: UserStatus.ACTIVE,
                lockedUntil: null,
            },
        });
    }

    /**
     * Find user by email with office relations.
     */
    async findUserByEmail(email: string) {
        return this.prisma.user.findUnique({
            where: { email },
            include: {
                offices: true,
                ownedOffice: true,
            },
        });
    }

    /**
     * Find user by ID (simple, no relations).
     */
    async findUserById(userId: string) {
        return this.prisma.user.findUnique({
            where: { id: userId },
        });
    }
}
