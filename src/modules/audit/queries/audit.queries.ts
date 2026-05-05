import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma, ProjectAction, TaskAction, AuthAuditEvent } from '../../../../prisma/src/generated/prisma-client/client';

@Injectable()
export class AuditRepository {
    constructor(private readonly prisma: PrismaService) { }


    // --- Auth Audit Logs ---

    async createAuthLog(data: Prisma.AuthAuditLogUncheckedCreateInput) {
        return this.prisma.authAuditLog.create({
            data,
        });
    }

    async findAllAuthLogs() {
        return this.prisma.authAuditLog.findMany({
            orderBy: { createdAt: 'desc' },
        });
    }

    async findAuthLogById(id: number) {
        return this.prisma.authAuditLog.findUnique({
            where: { id },
        });
    }

    async findAuthLogsByUser(userId: number) {
        return this.prisma.authAuditLog.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });
    }

    // --- Admin Audit Logs ---

    async createAdminLog(data: Prisma.AdminAuditLogUncheckedCreateInput) {
        return this.prisma.adminAuditLog.create({
            data,
        });
    }

    async findLastAdminLog() {
        return this.prisma.adminAuditLog.findFirst({
            orderBy: { createdAt: 'desc' },
            include: {
                admin: true,
                targetOffice: true,
            },
        });
    }

    async findLast100AdminLogs() {
        return this.prisma.adminAuditLog.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                admin: true,
                targetOffice: true,
            },
        });
    }

}
