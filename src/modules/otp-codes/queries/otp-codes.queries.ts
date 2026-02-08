import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma, OtpPurpose, OtpChannel } from 'prisma/src/generated/prisma-client/client';

@Injectable()
export class OtpCodesRepository {
    constructor(private readonly prisma: PrismaService) { }

    private get userSelect(): Prisma.UserSelect {
        return {
            id: true,
            fullName: true,
            email: true,
            phone: true,
        };
    }

    private get officeSelect(): Prisma.OfficeSelect {
        return {
            id: true,
            name: true,
        };
    }

    private get otpDetailInclude(): Prisma.OtpCodeInclude {
        return {
            user: { select: this.userSelect },
            office: { select: this.officeSelect },
        };
    }

    async create(data: Prisma.OtpCodeUncheckedCreateInput) {
        return this.prisma.otpCode.create({
            data,
            include: this.otpDetailInclude,
        });
    }

    async findAll() {
        return this.prisma.otpCode.findMany({
            include: this.otpDetailInclude,
            orderBy: { createdAt: 'desc' },
        });
    }

    async findById(id: string) {
        return this.prisma.otpCode.findUnique({
            where: { id },
            include: this.otpDetailInclude,
        });
    }

    async findValidOtp(userId: string, officeId: string) {
        return this.prisma.otpCode.findFirst({
            where: {
                userId,
                officeId,
                usedAt: null,
                expiresAt: { gt: new Date() },
            },
            orderBy: { createdAt: 'desc' },
        });
    }

    async findByUser(userId: string) {
        return this.prisma.otpCode.findMany({
            where: { userId },
            include: { office: { select: this.officeSelect } },
            orderBy: { createdAt: 'desc' },
        });
    }

    async findByPurpose(purpose: OtpPurpose) {
        return this.prisma.otpCode.findMany({
            where: { purpose },
            include: this.otpDetailInclude,
            orderBy: { createdAt: 'desc' },
        });
    }

    async findExpired() {
        return this.prisma.otpCode.findMany({
            where: {
                expiresAt: { lt: new Date() },
                usedAt: null,
            },
            include: this.otpDetailInclude,
            orderBy: { createdAt: 'desc' },
        });
    }

    async updateAttempts(id: string, attempts: number) {
        return this.prisma.otpCode.update({
            where: { id },
            data: { attempts },
        });
    }

    async markAsUsed(id: string) {
        return this.prisma.otpCode.update({
            where: { id },
            data: { usedAt: new Date() },
        });
    }

    async delete(id: string) {
        return this.prisma.otpCode.delete({
            where: { id },
        });
    }
}
