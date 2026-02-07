import { ProjectAction } from 'prisma/src/generated/prisma-client/client';
export declare class CreateProjectAuditLogDto {
    officeId: string;
    projectId: string;
    actorUserId: string;
    action: ProjectAction;
    fieldName?: string;
    oldValue?: string;
    newValue?: string;
    ip?: string;
    deviceFingerprint?: string;
    geo?: string;
}
