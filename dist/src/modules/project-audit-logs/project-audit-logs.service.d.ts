import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectAuditLogDto } from './dto/create-project-audit-log.dto';
import { ProjectAction } from 'prisma/src/generated/prisma-client/client';
export declare class ProjectAuditLogsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createProjectAuditLogDto: CreateProjectAuditLogDto): Promise<{
        office: {
            id: string;
            name: string;
        };
        project: {
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
        projectId: string;
        deviceFingerprint: string | null;
        ip: string | null;
        geo: string | null;
        actorUserId: string;
        action: ProjectAction;
        fieldName: string | null;
        oldValue: string | null;
        newValue: string | null;
    }>;
    findAll(): Promise<({
        office: {
            id: string;
            name: string;
        };
        project: {
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
        projectId: string;
        deviceFingerprint: string | null;
        ip: string | null;
        geo: string | null;
        actorUserId: string;
        action: ProjectAction;
        fieldName: string | null;
        oldValue: string | null;
        newValue: string | null;
    })[]>;
    findOne(id: string): Promise<{
        office: {
            id: string;
            name: string;
        };
        project: {
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
        projectId: string;
        deviceFingerprint: string | null;
        ip: string | null;
        geo: string | null;
        actorUserId: string;
        action: ProjectAction;
        fieldName: string | null;
        oldValue: string | null;
        newValue: string | null;
    }>;
    findByProject(projectId: string): Promise<({
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
        projectId: string;
        deviceFingerprint: string | null;
        ip: string | null;
        geo: string | null;
        actorUserId: string;
        action: ProjectAction;
        fieldName: string | null;
        oldValue: string | null;
        newValue: string | null;
    })[]>;
    findByOffice(officeId: string): Promise<({
        project: {
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
        projectId: string;
        deviceFingerprint: string | null;
        ip: string | null;
        geo: string | null;
        actorUserId: string;
        action: ProjectAction;
        fieldName: string | null;
        oldValue: string | null;
        newValue: string | null;
    })[]>;
    findByActor(actorUserId: string): Promise<({
        office: {
            id: string;
            name: string;
        };
        project: {
            id: string;
            name: string;
        };
    } & {
        officeId: string;
        id: string;
        createdAt: Date;
        projectId: string;
        deviceFingerprint: string | null;
        ip: string | null;
        geo: string | null;
        actorUserId: string;
        action: ProjectAction;
        fieldName: string | null;
        oldValue: string | null;
        newValue: string | null;
    })[]>;
    findByAction(action: ProjectAction): Promise<({
        office: {
            id: string;
            name: string;
        };
        project: {
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
        projectId: string;
        deviceFingerprint: string | null;
        ip: string | null;
        geo: string | null;
        actorUserId: string;
        action: ProjectAction;
        fieldName: string | null;
        oldValue: string | null;
        newValue: string | null;
    })[]>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
