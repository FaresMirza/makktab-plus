import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma, ProjectStatus } from '../../../../prisma/src/generated/prisma-client/client';

@Injectable()
export class ProjectsRepository {
    constructor(private readonly prisma: PrismaService) { }

    private get userSelect(): Prisma.UserSelect {
        return {
            id: true,
            fullName: true,
            email: true,
            username: true,
        };
    }

    private get officeSelect(): Prisma.OfficeSelect {
        return {
            id: true,
            name: true,
            status: true,
        };
    }

    private get projectListInclude(): Prisma.ProjectInclude {
        return {
            office: { select: this.officeSelect },
            createdBy: { select: this.userSelect },
            projectManager: { select: this.userSelect },
            _count: { select: { tasks: true } },
        };
    }

    private get projectDetailInclude(): Prisma.ProjectInclude {
        return {
            office: { select: this.officeSelect },
            createdBy: { select: this.userSelect },
            projectManager: { select: this.userSelect },
            tasks: {
                select: {
                    id: true,
                    title: true,
                    description: true,
                    status: true,
                    dueDate: true,
                    createdAt: true,
                    assignedTo: { select: { id: true, fullName: true, email: true } },
                },
            },
        };
    }

    async create(data: Prisma.ProjectUncheckedCreateInput) {
        return this.prisma.project.create({
            data,
            include: {
                office: { select: this.officeSelect },
                createdBy: { select: this.userSelect },
                projectManager: { select: this.userSelect },
            },
        });
    }

    async findAll() {
        return this.prisma.project.findMany({
            include: this.projectListInclude,
            orderBy: { createdAt: 'desc' },
        });
    }

    async findById(id: string) {
        return this.prisma.project.findUnique({
            where: { id },
            include: this.projectDetailInclude,
        });
    }

    async findByIdSimple(id: string) {
        return this.prisma.project.findUnique({
            where: { id },
        });
    }

    async findByOffice(officeId: string) {
        return this.prisma.project.findMany({
            where: { officeId },
            include: this.projectListInclude,
            orderBy: { createdAt: 'desc' },
        });
    }

    async findByStatus(status: ProjectStatus) {
        return this.prisma.project.findMany({
            where: { status },
            include: this.projectListInclude,
            orderBy: { createdAt: 'desc' },
        });
    }

    async findByProjectManager(projectManagerUserId: string) {
        return this.prisma.project.findMany({
            where: { projectManagerUserId },
            include: this.projectListInclude,
            orderBy: { createdAt: 'desc' },
        });
    }

    async update(id: string, data: Prisma.ProjectUncheckedUpdateInput) {
        return this.prisma.project.update({
            where: { id },
            data,
            include: this.projectListInclude,
        });
    }

    async delete(id: string) {
        return this.prisma.project.delete({
            where: { id },
        });
    }

    async softDelete(id: string) {
        return this.prisma.project.update({
            where: { id },
            data: { status: ProjectStatus.CANCELLED },
            include: {
                office: { select: { id: true, name: true } },
                createdBy: { select: { id: true, fullName: true, email: true } },
                projectManager: { select: { id: true, fullName: true, email: true } },
            },
        });
    }

    async findByIdWithTaskCount(id: string) {
        return this.prisma.project.findUnique({
            where: { id },
            include: {
                _count: { select: { tasks: true } },
            },
        });
    }

    async findByIdWithTasksStatus(id: string) {
        return this.prisma.project.findUnique({
            where: { id },
            include: {
                tasks: { select: { status: true } },
            },
        });
    }
}
