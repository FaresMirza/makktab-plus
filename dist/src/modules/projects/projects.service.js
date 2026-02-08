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
exports.ProjectsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("../../../prisma/src/generated/prisma-client/client");
let ProjectsService = class ProjectsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createProjectDto) {
        const { officeId, createdByUserId, projectManagerUserId, name, description, status } = createProjectDto;
        const office = await this.prisma.office.findUnique({
            where: { id: officeId },
        });
        if (!office) {
            throw new common_1.NotFoundException(`Office with ID ${officeId} not found`);
        }
        const creator = await this.prisma.user.findUnique({
            where: { id: createdByUserId },
        });
        if (!creator) {
            throw new common_1.NotFoundException(`Creator user with ID ${createdByUserId} not found`);
        }
        const projectManager = await this.prisma.user.findUnique({
            where: { id: projectManagerUserId },
        });
        if (!projectManager) {
            throw new common_1.NotFoundException(`Project manager with ID ${projectManagerUserId} not found`);
        }
        const project = await this.prisma.project.create({
            data: {
                name,
                description,
                officeId,
                createdByUserId,
                projectManagerUserId,
                status: status || client_1.ProjectStatus.IN_PROGRESS,
            },
            include: {
                office: {
                    select: {
                        id: true,
                        name: true,
                        status: true,
                    },
                },
                createdBy: {
                    select: {
                        id: true,
                        fullName: true,
                        email: true,
                        username: true,
                    },
                },
                projectManager: {
                    select: {
                        id: true,
                        fullName: true,
                        email: true,
                        username: true,
                    },
                },
            },
        });
        return project;
    }
    async findAll() {
        const projects = await this.prisma.project.findMany({
            include: {
                office: {
                    select: {
                        id: true,
                        name: true,
                        status: true,
                    },
                },
                createdBy: {
                    select: {
                        id: true,
                        fullName: true,
                        email: true,
                        username: true,
                    },
                },
                projectManager: {
                    select: {
                        id: true,
                        fullName: true,
                        email: true,
                        username: true,
                    },
                },
                _count: {
                    select: {
                        tasks: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        return projects;
    }
    async findOne(id) {
        const project = await this.prisma.project.findUnique({
            where: { id },
            include: {
                office: {
                    select: {
                        id: true,
                        name: true,
                        status: true,
                    },
                },
                createdBy: {
                    select: {
                        id: true,
                        fullName: true,
                        email: true,
                        username: true,
                    },
                },
                projectManager: {
                    select: {
                        id: true,
                        fullName: true,
                        email: true,
                        username: true,
                    },
                },
                tasks: {
                    select: {
                        id: true,
                        title: true,
                        description: true,
                        status: true,
                        dueDate: true,
                        createdAt: true,
                        assignedTo: {
                            select: {
                                id: true,
                                fullName: true,
                                email: true,
                            },
                        },
                    },
                },
            },
        });
        if (!project) {
            throw new common_1.NotFoundException(`Project with ID ${id} not found`);
        }
        return project;
    }
    async findByOffice(officeId) {
        const projects = await this.prisma.project.findMany({
            where: { officeId },
            include: {
                createdBy: {
                    select: {
                        id: true,
                        fullName: true,
                        email: true,
                        username: true,
                    },
                },
                projectManager: {
                    select: {
                        id: true,
                        fullName: true,
                        email: true,
                        username: true,
                    },
                },
                _count: {
                    select: {
                        tasks: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        return projects;
    }
    async findByStatus(status) {
        const projects = await this.prisma.project.findMany({
            where: { status },
            include: {
                office: {
                    select: {
                        id: true,
                        name: true,
                        status: true,
                    },
                },
                createdBy: {
                    select: {
                        id: true,
                        fullName: true,
                        email: true,
                        username: true,
                    },
                },
                projectManager: {
                    select: {
                        id: true,
                        fullName: true,
                        email: true,
                        username: true,
                    },
                },
                _count: {
                    select: {
                        tasks: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        return projects;
    }
    async findByProjectManager(projectManagerUserId) {
        const projects = await this.prisma.project.findMany({
            where: { projectManagerUserId },
            include: {
                office: {
                    select: {
                        id: true,
                        name: true,
                        status: true,
                    },
                },
                createdBy: {
                    select: {
                        id: true,
                        fullName: true,
                        email: true,
                        username: true,
                    },
                },
                _count: {
                    select: {
                        tasks: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        return projects;
    }
    async update(id, updateProjectDto) {
        const existingProject = await this.prisma.project.findUnique({
            where: { id },
        });
        if (!existingProject) {
            throw new common_1.NotFoundException(`Project with ID ${id} not found`);
        }
        if (updateProjectDto.projectManagerUserId) {
            const projectManager = await this.prisma.user.findUnique({
                where: { id: updateProjectDto.projectManagerUserId },
            });
            if (!projectManager) {
                throw new common_1.NotFoundException(`Project manager with ID ${updateProjectDto.projectManagerUserId} not found`);
            }
        }
        const updatedProject = await this.prisma.project.update({
            where: { id },
            data: updateProjectDto,
            include: {
                office: {
                    select: {
                        id: true,
                        name: true,
                        status: true,
                    },
                },
                createdBy: {
                    select: {
                        id: true,
                        fullName: true,
                        email: true,
                        username: true,
                    },
                },
                projectManager: {
                    select: {
                        id: true,
                        fullName: true,
                        email: true,
                        username: true,
                    },
                },
                _count: {
                    select: {
                        tasks: true,
                    },
                },
            },
        });
        return updatedProject;
    }
    async remove(id, hardDelete = false) {
        const project = await this.prisma.project.findUnique({
            where: { id },
            include: {
                _count: {
                    select: {
                        tasks: true,
                    },
                },
            },
        });
        if (!project) {
            throw new common_1.NotFoundException(`Project with ID ${id} not found`);
        }
        if (hardDelete) {
            if (project._count.tasks > 0) {
                throw new common_1.ConflictException('Cannot permanently delete project with existing tasks. Please remove them first.');
            }
            await this.prisma.project.delete({
                where: { id },
            });
            return { message: 'Project permanently deleted' };
        }
        else {
            const cancelledProject = await this.prisma.project.update({
                where: { id },
                data: { status: client_1.ProjectStatus.CANCELLED },
                include: {
                    office: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                    createdBy: {
                        select: {
                            id: true,
                            fullName: true,
                            email: true,
                        },
                    },
                    projectManager: {
                        select: {
                            id: true,
                            fullName: true,
                            email: true,
                        },
                    },
                },
            });
            return cancelledProject;
        }
    }
    async getStatistics(id) {
        const project = await this.prisma.project.findUnique({
            where: { id },
            include: {
                tasks: {
                    select: {
                        status: true,
                    },
                },
            },
        });
        if (!project) {
            throw new common_1.NotFoundException(`Project with ID ${id} not found`);
        }
        const tasksByStatus = project.tasks.reduce((acc, task) => {
            acc[task.status] = (acc[task.status] || 0) + 1;
            return acc;
        }, {});
        return {
            projectId: project.id,
            projectName: project.name,
            status: project.status,
            statistics: {
                totalTasks: project.tasks.length,
                tasksByStatus,
            },
        };
    }
};
exports.ProjectsService = ProjectsService;
exports.ProjectsService = ProjectsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProjectsService);
//# sourceMappingURL=projects.service.js.map