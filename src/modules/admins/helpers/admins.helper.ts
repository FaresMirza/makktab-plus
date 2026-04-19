import { Injectable, NotFoundException } from '@nestjs/common';
import { AuditRepository } from '../../audit/queries/audit.queries';
import { AdminAction } from '../../../../prisma/src/generated/prisma-client/client';
import { PrismaService } from '../../prisma/prisma.service';

export interface AuditMeta {
    adminPublicId: string;
    ip?: string;
    userAgent?: string;
    deviceFingerprint?: string;
}

@Injectable()
export class AdminsHelper {
    constructor(
        private readonly auditRepository: AuditRepository,
        private readonly prisma: PrismaService,
    ) { }

    /**
     * Resolve user publicId to internal id
     */
    async resolveUserId(publicId: string): Promise<number> {
        const user = await this.prisma.user.findUnique({
            where: { publicId },
            select: { id: true },
        });
        if (!user) {
            throw new NotFoundException(`Admin user not found`);
        }
        return user.id;
    }

    /**
     * Log an admin action
     */
    async logAction(
        meta: AuditMeta,
        action: AdminAction,
        details: {
            targetOfficeId?: number;
            targetRequestId?: string;
            reason?: string;
        },
    ) {
        const adminUserId = await this.resolveUserId(meta.adminPublicId);
        return this.auditRepository.createAdminLog({
            adminUserId,
            action,
            targetOfficeId: details.targetOfficeId,
            targetRequestId: details.targetRequestId,
            reason: details.reason,
            ip: meta.ip,
            userAgent: meta.userAgent,
            deviceFingerprint: meta.deviceFingerprint,
        });
    }

    async getLastAdminLog(adminPublicId: string) {
        const adminUserId = await this.resolveUserId(adminPublicId);
        return this.auditRepository.findLastAdminLog(adminUserId);
    }

    async getLast100AdminLogs(adminPublicId: string) {
        const adminUserId = await this.resolveUserId(adminPublicId);
        return this.auditRepository.findLast100AdminLogs(adminUserId);
    }
}
