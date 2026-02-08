import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma, LoginMethod } from '../../../../prisma/src/generated/prisma-client/client';

@Injectable()
export class LoginAttemptsRepository {
    constructor(private readonly prisma: PrismaService) { }

    private get userSelect(): Prisma.UserSelect {
        return {
            id: true,
            fullName: true,
            email: true,
            username: true,
        };
    }

    private get officeSelect(): Prisma.OfficeSelect {
        return {
            id: true,
            name: true,
        };
    }

    private get loginAttemptListInclude(): Prisma.LoginAttemptInclude {
        return {
            user: { select: this.userSelect },
            office: { select: this.officeSelect },
        };
    }

    async create(data: Prisma.LoginAttemptUncheckedCreateInput) {
        return this.prisma.loginAttempt.create({
            data,
            include: this.loginAttemptListInclude,
        });
    }

    async findAll() {
        return this.prisma.loginAttempt.findMany({
            include: this.loginAttemptListInclude,
            orderBy: { createdAt: 'desc' },
        });
    }

    async findById(id: string) {
        return this.prisma.loginAttempt.findUnique({
            where: { id },
            include: this.loginAttemptListInclude,
        });
    }

    async findByUser(userId: string) {
        return this.prisma.loginAttempt.findMany({
            where: { userId },
            include: { office: { select: this.officeSelect } },
            orderBy: { createdAt: 'desc' },
        });
    }

    async findByOffice(officeId: string) {
        return this.prisma.loginAttempt.findMany({
            where: { officeId },
            include: { user: { select: this.userSelect } },
            orderBy: { createdAt: 'desc' },
        });
    }

    async findFailed() {
        return this.prisma.loginAttempt.findMany({
            where: { success: false },
            include: this.loginAttemptListInclude,
            orderBy: { createdAt: 'desc' },
        });
    }

    async findSuccessful() {
        return this.prisma.loginAttempt.findMany({
            where: { success: true },
            include: this.loginAttemptListInclude,
            orderBy: { createdAt: 'desc' },
        });
    }

    async findByMethod(method: LoginMethod) {
        return this.prisma.loginAttempt.findMany({
            where: { method },
            include: this.loginAttemptListInclude,
            orderBy: { createdAt: 'desc' },
        });
    }

    async countByUser(userId: string, success?: boolean) {
        const where: Prisma.LoginAttemptWhereInput = { userId };
        if (success !== undefined) {
            where.success = success;
        }
        return this.prisma.loginAttempt.count({ where });
    }

    async delete(id: string) {
        return this.prisma.loginAttempt.delete({
            where: { id },
        });
    }
}
