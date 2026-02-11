import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { OtpPurpose, OtpChannel } from 'prisma/src/generated/prisma-client/client';

@Injectable()
export class AuthRepository {
    constructor(private readonly prisma: PrismaService) { }





    /**
     * Create OTP code
     */
    async createOtpCode(data: {
        userId: string;
        officeId: string;
        email: string;
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








}

