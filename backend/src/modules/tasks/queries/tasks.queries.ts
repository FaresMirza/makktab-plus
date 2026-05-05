import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma, TaskStatus } from '../../../../prisma/src/generated/prisma-client/client';

@Injectable()
export class TasksRepository {
    constructor(private readonly prisma: PrismaService) { }

    private get userSelect(): Prisma.UserSelect {
        return {
            id: true,
            publicId: true,
            fullName: true,
            email: true,
            username: true,
        };
    }

    private get projectSelect(): Prisma.ProjectSelect {
        return {
            id: true,
            publicId: true,
            name: true,
            status: true,
            office: {
                select: {
                    id: true,
                    publicId: true,
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
                    publicId: true,
                    name: true,
                    description: true,
                    status: true,
                    office: {
                        select: {
                            id: true,
                            publicId: true,
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
                        publicId: true,
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

    /**
     * Build a where-clause from optional filters + optional office scope.
     * All filters are AND-combined.
     */
    private buildWhere(filters: {
        projectId?: number;
        status?: TaskStatus;
        assignedToUserId?: number;
        createdByUserId?: number;
        officeId?: number;
    }): Prisma.TaskWhereInput {
        const where: Prisma.TaskWhereInput = {};
        if (filters.projectId !== undefined) where.projectId = filters.projectId;
        if (filters.status !== undefined) where.status = filters.status;
        if (filters.assignedToUserId !== undefined)
            where.assignedToUserId = filters.assignedToUserId;
        if (filters.createdByUserId !== undefined)
            where.createdByUserId = filters.createdByUserId;
        if (filters.officeId !== undefined) {
            where.project = { officeId: filters.officeId };
        }
        return where;
    }

    async findFiltered(filters: {
        projectId?: number;
        status?: TaskStatus;
        assignedToUserId?: number;
        createdByUserId?: number;
        officeId?: number;
    }) {
        return this.prisma.task.findMany({
            where: this.buildWhere(filters),
            include: this.taskListInclude,
            orderBy: { createdAt: 'desc' },
        });
    }

    /**
     * Paginated variant of findFiltered. Returns a [rows, total] tuple.
     */
    async findFilteredPaginated(
        filters: {
            projectId?: number;
            status?: TaskStatus;
            assignedToUserId?: number;
            createdByUserId?: number;
            officeId?: number;
        },
        skip: number,
        take: number,
    ): Promise<[any[], number]> {
        const where = this.buildWhere(filters);
        return this.prisma.$transaction([
            this.prisma.task.findMany({
                where,
                include: this.taskListInclude,
                orderBy: { createdAt: 'desc' },
                skip,
                take,
            }),
            this.prisma.task.count({ where }),
        ]);
    }

    async findOverduePaginated(
        officeId: number | null,
        skip: number,
        take: number,
    ): Promise<[any[], number]> {
        const where: Prisma.TaskWhereInput = {
            dueDate: { lt: new Date() },
            status: { not: TaskStatus.DONE },
        };
        if (officeId !== null) {
            where.project = { officeId };
        }
        return this.prisma.$transaction([
            this.prisma.task.findMany({
                where,
                include: {
                    project: {
                        select: {
                            id: true,
                            publicId: true,
                            name: true,
                            status: true,
                        },
                    },
                    createdBy: { select: { id: true, publicId: true, fullName: true, email: true } },
                    assignedTo: { select: { id: true, publicId: true, fullName: true, email: true } },
                },
                orderBy: { dueDate: 'asc' },
                skip,
                take,
            }),
            this.prisma.task.count({ where }),
        ]);
    }

    async findById(id: number) {
        return this.prisma.task.findUnique({
            where: { id },
            include: this.taskDetailInclude,
        });
    }

    async findByPublicId(publicId: string) {
        return this.prisma.task.findUnique({
            where: { publicId },
            include: this.taskDetailInclude,
        });
    }

    async findByIdSimple(id: number) {
        return this.prisma.task.findUnique({
            where: { id },
        });
    }

    async findByPublicIdSimple(publicId: string) {
        return this.prisma.task.findUnique({
            where: { publicId },
        });
    }

    async findByProject(projectId: number) {
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

    async findByAssignee(assignedToUserId: number) {
        return this.prisma.task.findMany({
            where: { assignedToUserId },
            include: {
                project: { select: this.projectSelect },
                createdBy: { select: this.userSelect },
            },
            orderBy: { dueDate: 'asc' },
        });
    }

    async findByCreator(createdByUserId: number) {
        return this.prisma.task.findMany({
            where: { createdByUserId },
            include: {
                project: {
                    select: {
                        id: true,
                        publicId: true,
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
                        publicId: true,
                        name: true,
                        status: true,
                    },
                },
                createdBy: { select: { id: true, publicId: true, fullName: true, email: true } },
                assignedTo: { select: { id: true, publicId: true, fullName: true, email: true } },
            },
            orderBy: { dueDate: 'asc' },
        });
    }

    async update(id: number, data: Prisma.TaskUncheckedUpdateInput) {
        return this.prisma.task.update({
            where: { id },
            data,
            include: {
                project: {
                    select: {
                        id: true,
                        publicId: true,
                        name: true,
                        status: true,
                    },
                },
                createdBy: { select: this.userSelect },
                assignedTo: { select: this.userSelect },
            },
        });
    }

    async delete(id: number) {
        return this.prisma.task.delete({
            where: { id },
        });
    }

    async softDelete(id: number) {
        return this.prisma.task.update({
            where: { id },
            data: { status: TaskStatus.CANCELLED },
            include: {
                project: { select: { id: true, publicId: true, name: true } },
                createdBy: { select: { id: true, publicId: true, fullName: true, email: true } },
                assignedTo: { select: { id: true, publicId: true, fullName: true, email: true } },
            },
        });
    }
}
