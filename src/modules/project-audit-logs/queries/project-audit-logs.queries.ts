import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma, ProjectAction } from 'prisma/src/generated/prisma-client/client';

@Injectable()
export class ProjectAuditLogsRepository {
    constructor(private readonly prisma: PrismaService) { }

    private get officeSelect(): Prisma.OfficeSelect {
        return { id: true, name: true };
    }

    private get projectSelect(): Prisma.ProjectSelect {
        return { id: true, name: true };
    }

    private get userSelect(): Prisma.UserSelect {
        return { id: true, fullName: true, email: true, username: true };
    }

    private get auditLogInclude(): Prisma.ProjectAuditLogInclude {
        return {
            office: { select: this.officeSelect },
            project: { select: this.projectSelect },
            actor: { select: this.userSelect },
        };
    }

    async create(data: Prisma.ProjectAuditLogUncheckedCreateInput) {
        return this.prisma.projectAuditLog.create({
            data,
            include: this.auditLogInclude,
        });
    }

    async findAll() {
        return this.prisma.projectAuditLog.findMany({
            include: this.auditLogInclude,
            orderBy: { createdAt: 'desc' },
        });
    }

    async findById(id: string) {
        return this.prisma.projectAuditLog.findUnique({
            where: { id },
            include: this.auditLogInclude,
        });
    }

    async findByProject(projectId: string) {
        return this.prisma.projectAuditLog.findMany({
            where: { projectId },
            include: {
                office: { select: this.officeSelect },
                actor: { select: this.userSelect },
            },
            orderBy: { createdAt: 'desc' },
        });
    }

    async findByOffice(officeId: string) {
        return this.prisma.projectAuditLog.findMany({
            where: { officeId },
            include: {
                project: { select: this.projectSelect },
                actor: { select: this.userSelect },
            },
            orderBy: { createdAt: 'desc' },
        });
    }

    async findByActor(actorUserId: string) {
        return this.prisma.projectAuditLog.findMany({
            where: { actorUserId },
            include: {
                office: { select: this.officeSelect },
                project: { select: this.projectSelect },
            },
            orderBy: { createdAt: 'desc' },
        });
    }

    async findByAction(action: ProjectAction) {
        return this.prisma.projectAuditLog.findMany({
            where: { action },
            include: this.auditLogInclude,
            orderBy: { createdAt: 'desc' },
        });
    }

    async delete(id: string) {
        return this.prisma.projectAuditLog.delete({
            where: { id },
        });
    }
}
