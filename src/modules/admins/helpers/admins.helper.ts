import { Injectable } from '@nestjs/common';
import { AuditRepository } from '../../audit/queries/audit.queries';
import { AdminAction } from '../../../../prisma/src/generated/prisma-client/client';

export interface AuditMeta {
    adminUserId: number;
    ip?: string;
    userAgent?: string;
    deviceFingerprint?: string;
}

@Injectable()
export class AdminsHelper {
    constructor(private readonly auditRepository: AuditRepository) { }

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
        return this.auditRepository.createAdminLog({
            adminUserId: meta.adminUserId,
            action,
            targetOfficeId: details.targetOfficeId,
            targetRequestId: details.targetRequestId,
            reason: details.reason,
            ip: meta.ip,
            userAgent: meta.userAgent,
            deviceFingerprint: meta.deviceFingerprint,
        });
    }

    async getLastAdminLog(adminUserId: number) {
        return this.auditRepository.findLastAdminLog(adminUserId);
    }

    async getLast100AdminLogs(adminUserId: number) {
        return this.auditRepository.findLast100AdminLogs(adminUserId);
    }
}
