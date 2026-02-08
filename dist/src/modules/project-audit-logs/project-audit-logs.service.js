"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectAuditLogsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ProjectAuditLogsService = class ProjectAuditLogsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createProjectAuditLogDto) {
        const { officeId, projectId, actorUserId, action, ...rest } = createProjectAuditLogDto;
        const office = await this.prisma.office.findUnique({
            where: { id: officeId },
        });
        if (!office) {
            throw new common_1.NotFoundException(`Office with ID ${officeId} not found`);
        }
        const project = await this.prisma.project.findUnique({
            where: { id: projectId },
        });
        if (!project) {
            throw new common_1.NotFoundException(`Project with ID ${projectId} not found`);
        }
        const actor = await this.prisma.user.findUnique({
            where: { id: actorUserId },
        });
        if (!actor) {
            throw new common_1.NotFoundException(`Actor user with ID ${actorUserId} not found`);
        }
        const auditLog = await this.prisma.projectAuditLog.create({
            data: {
                officeId,
                projectId,
                actorUserId,
                action,
                fieldName: rest.fieldName,
                oldValue: rest.oldValue,
                newValue: rest.newValue,
                ip: rest.ip,
                deviceFingerprint: rest.deviceFingerprint,
                geo: rest.geo,
            },
            include: {
                office: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
                project: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
                actor: {
                    select: {
                        id: true,
                        fullName: true,
                        email: true,
                        username: true,
                    },
                },
            },
        });
        return auditLog;
    }
    async findAll() {
        const auditLogs = await this.prisma.projectAuditLog.findMany({
            include: {
                office: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
                project: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
                actor: {
                    select: {
                        id: true,
                        fullName: true,
                        email: true,
                        username: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        return auditLogs;
    }
    async findOne(id) {
        const auditLog = await this.prisma.projectAuditLog.findUnique({
            where: { id },
            include: {
                office: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
                project: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
                actor: {
                    select: {
                        id: true,
                        fullName: true,
                        email: true,
                        username: true,
                    },
                },
            },
        });
        if (!auditLog) {
            throw new common_1.NotFoundException(`Project audit log with ID ${id} not found`);
        }
        return auditLog;
    }
    async findByProject(projectId) {
        const auditLogs = await this.prisma.projectAuditLog.findMany({
            where: { projectId },
            include: {
                office: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
                actor: {
                    select: {
                        id: true,
                        fullName: true,
                        email: true,
                        username: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        return auditLogs;
    }
    async findByOffice(officeId) {
        const auditLogs = await this.prisma.projectAuditLog.findMany({
            where: { officeId },
            include: {
                project: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
                actor: {
                    select: {
                        id: true,
                        fullName: true,
                        email: true,
                        username: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        return auditLogs;
    }
    async findByActor(actorUserId) {
        const auditLogs = await this.prisma.projectAuditLog.findMany({
            where: { actorUserId },
            include: {
                office: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
                project: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        return auditLogs;
    }
    async findByAction(action) {
        const auditLogs = await this.prisma.projectAuditLog.findMany({
            where: { action },
            include: {
                office: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
                project: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
                actor: {
                    select: {
                        id: true,
                        fullName: true,
                        email: true,
                        username: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        return auditLogs;
    }
    async remove(id) {
        const auditLog = await this.prisma.projectAuditLog.findUnique({
            where: { id },
        });
        if (!auditLog) {
            throw new common_1.NotFoundException(`Project audit log with ID ${id} not found`);
        }
        await this.prisma.projectAuditLog.delete({
            where: { id },
        });
        return { message: 'Project audit log deleted successfully' };
    }
};
exports.ProjectAuditLogsService = ProjectAuditLogsService;
exports.ProjectAuditLogsService = ProjectAuditLogsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProjectAuditLogsService);
//# sourceMappingURL=project-audit-logs.service.js.map