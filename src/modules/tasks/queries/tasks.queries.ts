import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma, TaskStatus } from '../../../../prisma/src/generated/prisma-client/client';

@Injectable()
export class TasksRepository {
    constructor(private readonly prisma: PrismaService) { }

    private get userSelect(): Prisma.UserSelect {
        return {
            id: true,
            fullName: true,
            email: true,
            username: true,
        };
    }

    private get projectSelect(): Prisma.ProjectSelect {
        return {
            id: true,
            name: true,
            status: true,
            office: {
                select: {
                    id: true,
                    name: true,
                },
            },
        };
    }

    private get taskListInclude(): Prisma.TaskInclude {
        return {
            project: { select: this.projectSelect },
            createdBy: { select: this.userSelect },
            assignedTo: { select: this.userSelect },
        };
    }

    private get taskDetailInclude(): Prisma.TaskInclude {
        return {
            project: {
                select: {
                    id: true,
                    name: true,
                    description: true,
                    status: true,
                    office: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                },
            },
            createdBy: { select: this.userSelect },
            assignedTo: {
                select: {
                    ...this.userSelect,
                    status: true,
                } as Prisma.UserSelect,
            },
        };
    }

    async create(data: Prisma.TaskUncheckedCreateInput) {
        return this.prisma.task.create({
            data,
            include: {
                project: {
                    select: {
                        id: true,
                        name: true,
                        status: true,
                    },
                },
                createdBy: { select: this.userSelect },
                assignedTo: { select: this.userSelect },
            },
        });
    }

    async findAll() {
        return this.prisma.task.findMany({
            include: this.taskListInclude,
            orderBy: { createdAt: 'desc' },
        });
    }

    async findById(id: string) {
        return this.prisma.task.findUnique({
            where: { id },
            include: this.taskDetailInclude,
        });
    }

    async findByIdSimple(id: string) {
        return this.prisma.task.findUnique({
            where: { id },
        });
    }

    async findByProject(projectId: string) {
        return this.prisma.task.findMany({
            where: { projectId },
            include: {
                createdBy: { select: this.userSelect },
                assignedTo: { select: this.userSelect },
            },
            orderBy: { createdAt: 'desc' },
        });
    }

    async findByStatus(status: TaskStatus) {
        return this.prisma.task.findMany({
            where: { status },
            include: this.taskListInclude,
            orderBy: { createdAt: 'desc' },
        });
    }

    async findByAssignee(assignedToUserId: string) {
        return this.prisma.task.findMany({
            where: { assignedToUserId },
            include: {
                project: { select: this.projectSelect },
                createdBy: { select: this.userSelect },
            },
            orderBy: { dueDate: 'asc' },
        });
    }

    async findByCreator(createdByUserId: string) {
        return this.prisma.task.findMany({
            where: { createdByUserId },
            include: {
                project: {
                    select: {
                        id: true,
                        name: true,
                        status: true,
                    },
                },
                assignedTo: { select: this.userSelect },
            },
            orderBy: { createdAt: 'desc' },
        });
    }

    async findOverdue() {
        return this.prisma.task.findMany({
            where: {
                dueDate: { lt: new Date() },
                status: { not: TaskStatus.DONE },
            },
            include: {
                project: {
                    select: {
                        id: true,
                        name: true,
                        status: true,
                    },
                },
                createdBy: { select: { id: true, fullName: true, email: true } },
                assignedTo: { select: { id: true, fullName: true, email: true } },
            },
            orderBy: { dueDate: 'asc' },
        });
    }

    async update(id: string, data: Prisma.TaskUncheckedUpdateInput) {
        return this.prisma.task.update({
            where: { id },
            data,
            include: {
                project: {
                    select: {
                        id: true,
                        name: true,
                        status: true,
                    },
                },
                createdBy: { select: this.userSelect },
                assignedTo: { select: this.userSelect },
            },
        });
    }

    async delete(id: string) {
        return this.prisma.task.delete({
            where: { id },
        });
    }

    async softDelete(id: string) {
        return this.prisma.task.update({
            where: { id },
            data: { status: TaskStatus.CANCELLED },
            include: {
                project: { select: { id: true, name: true } },
                createdBy: { select: { id: true, fullName: true, email: true } },
                assignedTo: { select: { id: true, fullName: true, email: true } },
            },
        });
    }
}
