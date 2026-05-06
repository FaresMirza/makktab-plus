import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma, ProjectStatus } from '../../../../prisma/src/generated/prisma-client/client';

@Injectable()
export class ProjectsRepository {
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

    private get officeSelect(): Prisma.OfficeSelect {
        return {
            id: true,
            publicId: true,
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
                    publicId: true,
                    title: true,
                    description: true,
                    status: true,
                    dueDate: true,
                    createdAt: true,
                    assignedTo: { select: { id: true, publicId: true, fullName: true, email: true } },
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

    async findById(id: number) {
        return this.prisma.project.findUnique({
            where: { id },
            include: this.projectDetailInclude,
        });
    }

    async findByPublicId(publicId: string) {
        return this.prisma.project.findUnique({
            where: { publicId },
            include: this.projectDetailInclude,
        });
    }

    async findByIdSimple(id: number) {
        return this.prisma.project.findUnique({
            where: { id },
        });
    }

    async findByPublicIdSimple(publicId: string) {
        return this.prisma.project.findUnique({
            where: { publicId },
        });
    }

    private get projectListIncludeWithStats(): Prisma.ProjectInclude {
        return {
            office: { select: this.officeSelect },
            createdBy: { select: this.userSelect },
            projectManager: { select: this.userSelect },
            
            _count: { select: { tasks: true } },
        };
    }

    async findByOffice(officeId: number) {
        return this.prisma.project.findMany({
            where: { officeId },
            include: this.projectListInclude,
            orderBy: { createdAt: 'desc' },
        });
    }

    async findByOfficeFilteredPaginated(
        officeId: number,
        filters: {
            status?: ProjectStatus;
            projectManagerUserId?: number;
            // When set, restrict to projects where the user is either the
            // assigned manager OR has at least one assigned task. Used for
            // employees and project-managers-only.
            restrictToUserId?: number;
        },
        skip: number,
        take: number,
    ): Promise<[any[], number]> {
        const where: Prisma.ProjectWhereInput = { officeId };
        if (filters.status) where.status = filters.status;
        if (filters.projectManagerUserId) where.projectManagerUserId = filters.projectManagerUserId;
        if (filters.restrictToUserId !== undefined) {
            const me = filters.restrictToUserId;
            where.OR = [
                { projectManagerUserId: me },
                { tasks: { some: { assignedToUserId: me } } },
            ];
        }
        return this.prisma.$transaction([
            this.prisma.project.findMany({
                where,
                include: this.projectListInclude,
                orderBy: { createdAt: 'desc' },
                skip,
                take,
            }),
            this.prisma.project.count({ where }),
        ]);
    }

    async findByStatus(status: ProjectStatus) {
        return this.prisma.project.findMany({
            where: { status },
            include: this.projectListInclude,
            orderBy: { createdAt: 'desc' },
        });
    }

    async findByProjectManager(projectManagerUserId: number) {
        return this.prisma.project.findMany({
            where: { projectManagerUserId },
            include: this.projectListInclude,
            orderBy: { createdAt: 'desc' },
        });
    }

    async update(id: number, data: Prisma.ProjectUncheckedUpdateInput) {
        return this.prisma.project.update({
            where: { id },
            data,
            include: this.projectListInclude,
        });
    }

    async delete(id: number) {
        return this.prisma.project.delete({
            where: { id },
        });
    }

    async softDelete(id: number) {
        return this.prisma.project.update({
            where: { id },
            data: { status: ProjectStatus.CANCELLED },
            include: {
                office: { select: { id: true, publicId: true, name: true } },
                createdBy: { select: { id: true, publicId: true, fullName: true, email: true } },
                projectManager: { select: { id: true, publicId: true, fullName: true, email: true } },
            },
        });
    }

    async findByIdWithTaskCount(id: number) {
        return this.prisma.project.findUnique({
            where: { id },
            include: {
                _count: { select: { tasks: true } },
            },
        });
    }

    async findByPublicIdWithTaskCount(publicId: string) {
        return this.prisma.project.findUnique({
            where: { publicId },
            include: {
                _count: { select: { tasks: true } },
            },
        });
    }

    async findByIdWithTasksStatus(id: number) {
        return this.prisma.project.findUnique({
            where: { id },
            include: {
                tasks: { select: { status: true } },
            },
        });
    }

    async findByPublicIdWithTasksStatus(publicId: string) {
        return this.prisma.project.findUnique({
            where: { publicId },
            include: {
                tasks: { select: { status: true } },
            },
        });
    }

    /**
     * Find projects by office and status (for tenant-isolated filtering)
     */
    async findByOfficeAndStatus(officeId: number, status: ProjectStatus) {
        return this.prisma.project.findMany({
            where: { officeId, status },
            include: this.projectListInclude,
            orderBy: { createdAt: 'desc' },
        });
    }

    /**
     * Find projects by office and project manager (for tenant-isolated filtering)
     */
    async findByOfficeAndProjectManager(officeId: number, projectManagerUserId: number) {
        return this.prisma.project.findMany({
            where: { officeId, projectManagerUserId },
            include: this.projectListInclude,
            orderBy: { createdAt: 'desc' },
        });
    }

    /**
     * Find a project by office and name (for duplicate name validation)
     */
    async findByOfficeAndName(officeId: number, name: string) {
        return this.prisma.project.findFirst({
            where: { officeId, name },
        });
    }
}
