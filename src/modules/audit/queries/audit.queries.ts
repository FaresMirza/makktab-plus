import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma, ProjectAction, LoginMethod, TaskAction, AuthAuditEvent } from '../../../../prisma/src/generated/prisma-client/client';

@Injectable()
export class AuditRepository {
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
        };
    }

    private get projectSelect(): Prisma.ProjectSelect {
        return {
            id: true,
            name: true,
        };
    }

    // --- Project Audit Logs ---

    private get projectAuditLogInclude(): Prisma.ProjectAuditLogInclude {
        return {
            office: { select: this.officeSelect },
            project: { select: this.projectSelect },
            actor: { select: this.userSelect },
        };
    }

    async createProjectLog(data: Prisma.ProjectAuditLogUncheckedCreateInput) {
        return this.prisma.projectAuditLog.create({
            data,
            include: this.projectAuditLogInclude,
        });
    }

    async findAllProjectLogs() {
        return this.prisma.projectAuditLog.findMany({
            include: this.projectAuditLogInclude,
            orderBy: { createdAt: 'desc' },
        });
    }

    async findProjectLogById(id: string) {
        return this.prisma.projectAuditLog.findUnique({
            where: { id },
            include: this.projectAuditLogInclude,
        });
    }

    async findProjectLogsByProject(projectId: string) {
        return this.prisma.projectAuditLog.findMany({
            where: { projectId },
            include: {
                office: { select: this.officeSelect },
                actor: { select: this.userSelect },
            },
            orderBy: { createdAt: 'desc' },
        });
    }

    async findProjectLogsByOffice(officeId: string) {
        return this.prisma.projectAuditLog.findMany({
            where: { officeId },
            include: {
                project: { select: this.projectSelect },
                actor: { select: this.userSelect },
            },
            orderBy: { createdAt: 'desc' },
        });
    }

    async findProjectLogsByActor(actorUserId: string) {
        return this.prisma.projectAuditLog.findMany({
            where: { actorUserId },
            include: {
                office: { select: this.officeSelect },
                project: { select: this.projectSelect },
            },
            orderBy: { createdAt: 'desc' },
        });
    }

    async findProjectLogsByAction(action: ProjectAction) {
        return this.prisma.projectAuditLog.findMany({
            where: { action },
            include: this.projectAuditLogInclude,
            orderBy: { createdAt: 'desc' },
        });
    }

    async deleteProjectLog(id: string) {
        return this.prisma.projectAuditLog.delete({
            where: { id },
        });
    }



    // --- Task Audit Logs ---

    private get taskSelect(): Prisma.TaskSelect {
        return {
            id: true,
            title: true,
        };
    }

    private get taskAuditLogInclude(): Prisma.TaskAuditLogInclude {
        return {
            office: { select: this.officeSelect },
            task: { select: this.taskSelect },
            actor: { select: this.userSelect },
        };
    }

    async createTaskLog(data: Prisma.TaskAuditLogUncheckedCreateInput) {
        return this.prisma.taskAuditLog.create({
            data,
            include: this.taskAuditLogInclude,
        });
    }

    async findAllTaskLogs() {
        return this.prisma.taskAuditLog.findMany({
            include: this.taskAuditLogInclude,
            orderBy: { createdAt: 'desc' },
        });
    }

    async findTaskLogById(id: string) {
        return this.prisma.taskAuditLog.findUnique({
            where: { id },
            include: this.taskAuditLogInclude,
        });
    }

    async findTaskLogsByTask(taskId: string) {
        return this.prisma.taskAuditLog.findMany({
            where: { taskId },
            include: {
                office: { select: this.officeSelect },
                actor: { select: this.userSelect },
            },
            orderBy: { createdAt: 'desc' },
        });
    }

    async findTaskLogsByOffice(officeId: string) {
        return this.prisma.taskAuditLog.findMany({
            where: { officeId },
            include: {
                task: { select: this.taskSelect },
                actor: { select: this.userSelect },
            },
            orderBy: { createdAt: 'desc' },
        });
    }

    async findTaskLogsByActor(actorUserId: string) {
        return this.prisma.taskAuditLog.findMany({
            where: { actorUserId },
            include: {
                office: { select: this.officeSelect },
                task: { select: this.taskSelect },
            },
            orderBy: { createdAt: 'desc' },
        });
    }

    async findTaskLogsByAction(action: TaskAction) {
        return this.prisma.taskAuditLog.findMany({
            where: { action },
            include: this.taskAuditLogInclude,
            orderBy: { createdAt: 'desc' },
        });
    }

    async deleteTaskLog(id: string) {
        return this.prisma.taskAuditLog.delete({
            where: { id },
        });
    }

    // --- Auth Audit Logs ---

    async createAuthLog(data: Prisma.AuthAuditLogUncheckedCreateInput) {
        return this.prisma.authAuditLog.create({
            data,
        });
    }

    async findAllAuthLogs() {
        return this.prisma.authAuditLog.findMany({
            orderBy: { createdAt: 'desc' },
        });
    }

    async findAuthLogById(id: string) {
        return this.prisma.authAuditLog.findUnique({
            where: { id },
        });
    }

    async findAuthLogsByUser(userId: string) {
        return this.prisma.authAuditLog.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });
    }

}
