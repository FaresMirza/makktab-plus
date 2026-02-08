import { TaskAuditLogsService } from './task-audit-logs.service';
import { CreateTaskAuditLogDto } from './dto/create-task-audit-log.dto';
import { TaskAction } from 'prisma/src/generated/prisma-client/client';
export declare class TaskAuditLogsController {
    private readonly taskAuditLogsService;
    constructor(taskAuditLogsService: TaskAuditLogsService);
    create(createTaskAuditLogDto: CreateTaskAuditLogDto): Promise<{
        office: {
            id: string;
            name: string;
        };
        task: {
            title: string;
            id: string;
        };
        actor: {
            fullName: string;
            email: string;
            username: string;
            id: string;
        };
    } & {
        officeId: string;
        id: string;
        createdAt: Date;
        deviceFingerprint: string | null;
        ip: string | null;
        geo: string | null;
        actorUserId: string;
        action: TaskAction;
        fieldName: string | null;
        oldValue: string | null;
        newValue: string | null;
        taskId: string;
    }>;
    findAll(taskId?: string, officeId?: string, actorUserId?: string, action?: TaskAction): Promise<({
        office: {
            id: string;
            name: string;
        };
        actor: {
            fullName: string;
            email: string;
            username: string;
            id: string;
        };
    } & {
        officeId: string;
        id: string;
        createdAt: Date;
        deviceFingerprint: string | null;
        ip: string | null;
        geo: string | null;
        actorUserId: string;
        action: TaskAction;
        fieldName: string | null;
        oldValue: string | null;
        newValue: string | null;
        taskId: string;
    })[]> | Promise<({
        task: {
            title: string;
            id: string;
        };
        actor: {
            fullName: string;
            email: string;
            username: string;
            id: string;
        };
    } & {
        officeId: string;
        id: string;
        createdAt: Date;
        deviceFingerprint: string | null;
        ip: string | null;
        geo: string | null;
        actorUserId: string;
        action: TaskAction;
        fieldName: string | null;
        oldValue: string | null;
        newValue: string | null;
        taskId: string;
    })[]> | Promise<({
        office: {
            id: string;
            name: string;
        };
        task: {
            title: string;
            id: string;
        };
    } & {
        officeId: string;
        id: string;
        createdAt: Date;
        deviceFingerprint: string | null;
        ip: string | null;
        geo: string | null;
        actorUserId: string;
        action: TaskAction;
        fieldName: string | null;
        oldValue: string | null;
        newValue: string | null;
        taskId: string;
    })[]>;
    findOne(id: string): Promise<{
        office: {
            id: string;
            name: string;
        };
        task: {
            title: string;
            id: string;
        };
        actor: {
            fullName: string;
            email: string;
            username: string;
            id: string;
        };
    } & {
        officeId: string;
        id: string;
        createdAt: Date;
        deviceFingerprint: string | null;
        ip: string | null;
        geo: string | null;
        actorUserId: string;
        action: TaskAction;
        fieldName: string | null;
        oldValue: string | null;
        newValue: string | null;
        taskId: string;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
