import { TaskAction } from 'prisma/src/generated/prisma-client/client';
export declare class CreateTaskAuditLogDto {
    officeId: string;
    taskId: string;
    actorUserId: string;
    action: TaskAction;
    fieldName?: string;
    oldValue?: string;
    newValue?: string;
    ip?: string;
    deviceFingerprint?: string;
    geo?: string;
}
