import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma, ProjectAction, LoginMethod, TaskAction } from '../../../../prisma/src/generated/prisma-client/client';

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

    // --- Login Attempts ---

    private get loginAttemptInclude(): Prisma.LoginAttemptInclude {
        return {
            user: { select: this.userSelect },
            office: { select: this.officeSelect },
        };
    }

    async createLoginAttempt(data: Prisma.LoginAttemptUncheckedCreateInput) {
        return this.prisma.loginAttempt.create({
            data,
            include: this.loginAttemptInclude,
        });
    }

    async findAllLoginAttempts() {
        return this.prisma.loginAttempt.findMany({
            include: this.loginAttemptInclude,
            orderBy: { createdAt: 'desc' },
        });
    }

    async findLoginAttemptById(id: string) {
        return this.prisma.loginAttempt.findUnique({
            where: { id },
            include: this.loginAttemptInclude,
        });
    }

    async findLoginAttemptsByUser(userId: string) {
        return this.prisma.loginAttempt.findMany({
            where: { userId },
            include: { office: { select: this.officeSelect } },
            orderBy: { createdAt: 'desc' },
        });
    }

    async findLoginAttemptsByOffice(officeId: string) {
        return this.prisma.loginAttempt.findMany({
            where: { officeId },
            include: { user: { select: this.userSelect } },
            orderBy: { createdAt: 'desc' },
        });
    }

    async findFailedLoginAttempts() {
        return this.prisma.loginAttempt.findMany({
            where: { success: false },
            include: this.loginAttemptInclude,
            orderBy: { createdAt: 'desc' },
        });
    }

    async findSuccessfulLoginAttempts() {
        return this.prisma.loginAttempt.findMany({
            where: { success: true },
            include: this.loginAttemptInclude,
            orderBy: { createdAt: 'desc' },
        });
    }

    async findLoginAttemptsByMethod(method: LoginMethod) {
        return this.prisma.loginAttempt.findMany({
            where: { method },
            include: this.loginAttemptInclude,
            orderBy: { createdAt: 'desc' },
        });
    }

    async countLoginAttemptsByUser(userId: string, success?: boolean) {
        const where: Prisma.LoginAttemptWhereInput = { userId };
        if (success !== undefined) {
            where.success = success;
        }
        return this.prisma.loginAttempt.count({ where });
    }

    async deleteLoginAttempt(id: string) {
        return this.prisma.loginAttempt.delete({
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
}
