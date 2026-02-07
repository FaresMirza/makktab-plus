import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskAuditLogDto } from './dto/create-task-audit-log.dto';
import { TaskAction } from 'prisma/src/generated/prisma-client/client';
export declare class TaskAuditLogsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
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
    findAll(): Promise<({
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
    findByTask(taskId: string): Promise<({
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
    })[]>;
    findByOffice(officeId: string): Promise<({
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
    })[]>;
    findByActor(actorUserId: string): Promise<({
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
    findByAction(action: TaskAction): Promise<({
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
    })[]>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
