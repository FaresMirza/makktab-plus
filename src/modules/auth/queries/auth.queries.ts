import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { OtpPurpose, OtpChannel } from 'prisma/src/generated/prisma-client/client';

@Injectable()
export class AuthRepository {
    constructor(private readonly prisma: PrismaService) { }

    /**
     * Find user by email (simple find for validation)
     */
    async findUserByEmailSimple(email: string) {
        return this.prisma.user.findUnique({
            where: { email },
            select: { id: true, email: true },
        });
    }

    /**
     * Find user by email with full details
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
     * Find user by username with full details
     */
    async findUserByUsername(username: string) {
        return this.prisma.user.findUnique({
            where: { username },
            include: {
                offices: true,
                ownedOffice: true,
            },
        });
    }

    /**
     * Update user password
     */
    async updatePassword(userId: string, passwordHash: string) {
        return this.prisma.user.update({
            where: { id: userId },
            data: { passwordHash },
        });
    }

    /**
     * Create OTP code
     */
    async createOtpCode(data: {
        userId: string;
        officeId: string;
        purpose: OtpPurpose;
        channel: OtpChannel;
        codeHash: string;
        expiresAt: Date;
        emailSnapshot?: string;
        phoneSnapshot?: string;
        ip?: string;
        userAgent?: string;
        deviceFingerprint?: string;
    }) {
        return this.prisma.otpCode.create({
            data: {
                ...data,
                attempts: 0,
            },
        });
    }

    /**
     * Find valid OTP code for user
     */
    async findValidOtpCode(userId: string, purpose: OtpPurpose) {
        return this.prisma.otpCode.findFirst({
            where: {
                userId,
                purpose,
                usedAt: null,
                expiresAt: {
                    gt: new Date(),
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }

    /**
     * Increment OTP attempts
     */
    async incrementOtpAttempts(otpId: string) {
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
     * Mark OTP as used
     */
    async markOtpAsUsed(otpId: string) {
        return this.prisma.otpCode.update({
            where: { id: otpId },
            data: {
                usedAt: new Date(),
            },
        });
    }







    /**
     * Update user refresh token hash
     */
    async updateRefreshTokenHash(userId: string, refreshTokenHash: string | null) {
        return this.prisma.user.update({
            where: { id: userId },
            data: { refreshTokenHash },
        });
    }

    /**
     * Find user by ID
     */
    async findUserById(userId: string) {
        return this.prisma.user.findUnique({
            where: { id: userId },
        });
    }
}

