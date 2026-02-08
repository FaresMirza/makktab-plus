import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskStatus } from 'prisma/src/generated/prisma-client/client';
export declare class TasksService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createTaskDto: CreateTaskDto): Promise<{
        project: {
            status: import("prisma/src/generated/prisma-client/client").ProjectStatus;
            id: string;
            name: string;
        };
        createdBy: {
            fullName: string;
            email: string;
            username: string;
            id: string;
        };
        assignedTo: {
            fullName: string;
            email: string;
            username: string;
            id: string;
        };
    } & {
        description: string | null;
        title: string;
        status: TaskStatus;
        id: string;
        createdAt: Date;
        createdByUserId: string;
        projectId: string;
        assignedToUserId: string;
        dueDate: Date | null;
    }>;
    findAll(): Promise<({
        project: {
            office: {
                id: string;
                name: string;
            };
            status: import("prisma/src/generated/prisma-client/client").ProjectStatus;
            id: string;
            name: string;
        };
        createdBy: {
            fullName: string;
            email: string;
            username: string;
            id: string;
        };
        assignedTo: {
            fullName: string;
            email: string;
            username: string;
            id: string;
        };
    } & {
        description: string | null;
        title: string;
        status: TaskStatus;
        id: string;
        createdAt: Date;
        createdByUserId: string;
        projectId: string;
        assignedToUserId: string;
        dueDate: Date | null;
    })[]>;
    findOne(id: string): Promise<{
        project: {
            office: {
                id: string;
                name: string;
            };
            description: string | null;
            status: import("prisma/src/generated/prisma-client/client").ProjectStatus;
            id: string;
            name: string;
        };
        createdBy: {
            fullName: string;
            email: string;
            username: string;
            id: string;
        };
        assignedTo: {
            fullName: string;
            email: string;
            username: string;
            status: import("prisma/src/generated/prisma-client/client").UserStatus;
            id: string;
        };
    } & {
        description: string | null;
        title: string;
        status: TaskStatus;
        id: string;
        createdAt: Date;
        createdByUserId: string;
        projectId: string;
        assignedToUserId: string;
        dueDate: Date | null;
    }>;
    findByProject(projectId: string): Promise<({
        createdBy: {
            fullName: string;
            email: string;
            username: string;
            id: string;
        };
        assignedTo: {
            fullName: string;
            email: string;
            username: string;
            id: string;
        };
    } & {
        description: string | null;
        title: string;
        status: TaskStatus;
        id: string;
        createdAt: Date;
        createdByUserId: string;
        projectId: string;
        assignedToUserId: string;
        dueDate: Date | null;
    })[]>;
    findByStatus(status: TaskStatus): Promise<({
        project: {
            status: import("prisma/src/generated/prisma-client/client").ProjectStatus;
            id: string;
            name: string;
        };
        createdBy: {
            fullName: string;
            email: string;
            username: string;
            id: string;
        };
        assignedTo: {
            fullName: string;
            email: string;
            username: string;
            id: string;
        };
    } & {
        description: string | null;
        title: string;
        status: TaskStatus;
        id: string;
        createdAt: Date;
        createdByUserId: string;
        projectId: string;
        assignedToUserId: string;
        dueDate: Date | null;
    })[]>;
    findByAssignee(assignedToUserId: string): Promise<({
        project: {
            office: {
                id: string;
                name: string;
            };
            status: import("prisma/src/generated/prisma-client/client").ProjectStatus;
            id: string;
            name: string;
        };
        createdBy: {
            fullName: string;
            email: string;
            username: string;
            id: string;
        };
    } & {
        description: string | null;
        title: string;
        status: TaskStatus;
        id: string;
        createdAt: Date;
        createdByUserId: string;
        projectId: string;
        assignedToUserId: string;
        dueDate: Date | null;
    })[]>;
    findByCreator(createdByUserId: string): Promise<({
        project: {
            status: import("prisma/src/generated/prisma-client/client").ProjectStatus;
            id: string;
            name: string;
        };
        assignedTo: {
            fullName: string;
            email: string;
            username: string;
            id: string;
        };
    } & {
        description: string | null;
        title: string;
        status: TaskStatus;
        id: string;
        createdAt: Date;
        createdByUserId: string;
        projectId: string;
        assignedToUserId: string;
        dueDate: Date | null;
    })[]>;
    findOverdue(): Promise<({
        project: {
            status: import("prisma/src/generated/prisma-client/client").ProjectStatus;
            id: string;
            name: string;
        };
        createdBy: {
            fullName: string;
            email: string;
            id: string;
        };
        assignedTo: {
            fullName: string;
            email: string;
            id: string;
        };
    } & {
        description: string | null;
        title: string;
        status: TaskStatus;
        id: string;
        createdAt: Date;
        createdByUserId: string;
        projectId: string;
        assignedToUserId: string;
        dueDate: Date | null;
    })[]>;
    update(id: string, updateTaskDto: UpdateTaskDto): Promise<{
        project: {
            status: import("prisma/src/generated/prisma-client/client").ProjectStatus;
            id: string;
            name: string;
        };
        createdBy: {
            fullName: string;
            email: string;
            username: string;
            id: string;
        };
        assignedTo: {
            fullName: string;
            email: string;
            username: string;
            id: string;
        };
    } & {
        description: string | null;
        title: string;
        status: TaskStatus;
        id: string;
        createdAt: Date;
        createdByUserId: string;
        projectId: string;
        assignedToUserId: string;
        dueDate: Date | null;
    }>;
    remove(id: string, hardDelete?: boolean): Promise<({
        project: {
            id: string;
            name: string;
        };
        createdBy: {
            fullName: string;
            email: string;
            id: string;
        };
        assignedTo: {
            fullName: string;
            email: string;
            id: string;
        };
    } & {
        description: string | null;
        title: string;
        status: TaskStatus;
        id: string;
        createdAt: Date;
        createdByUserId: string;
        projectId: string;
        assignedToUserId: string;
        dueDate: Date | null;
    }) | {
        message: string;
    }>;
}
