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
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("../../../prisma/src/generated/prisma-client/client");
let TasksService = class TasksService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createTaskDto) {
        const { projectId, createdByUserId, assignedToUserId, title, description, status, dueDate } = createTaskDto;
        const project = await this.prisma.project.findUnique({
            where: { id: projectId },
        });
        if (!project) {
            throw new common_1.NotFoundException(`Project with ID ${projectId} not found`);
        }
        const creator = await this.prisma.user.findUnique({
            where: { id: createdByUserId },
        });
        if (!creator) {
            throw new common_1.NotFoundException(`Creator user with ID ${createdByUserId} not found`);
        }
        const assignee = await this.prisma.user.findUnique({
            where: { id: assignedToUserId },
        });
        if (!assignee) {
            throw new common_1.NotFoundException(`Assignee user with ID ${assignedToUserId} not found`);
        }
        const task = await this.prisma.task.create({
            data: {
                title,
                description,
                projectId,
                createdByUserId,
                assignedToUserId,
                status: status || client_1.TaskStatus.TODO,
                dueDate: dueDate ? new Date(dueDate) : null,
            },
            include: {
                project: {
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
                assignedTo: {
                    select: {
                        id: true,
                        fullName: true,
                        email: true,
                        username: true,
                    },
                },
            },
        });
        return task;
    }
    async findAll() {
        const tasks = await this.prisma.task.findMany({
            include: {
                project: {
                    select: {
                        id: true,
                        name: true,
                        status: true,
                        office: {
                            select: {
                                id: true,
                                name: true,
                            },
                        },
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
                assignedTo: {
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
        return tasks;
    }
    async findOne(id) {
        const task = await this.prisma.task.findUnique({
            where: { id },
            include: {
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
                createdBy: {
                    select: {
                        id: true,
                        fullName: true,
                        email: true,
                        username: true,
                    },
                },
                assignedTo: {
                    select: {
                        id: true,
                        fullName: true,
                        email: true,
                        username: true,
                        status: true,
                    },
                },
            },
        });
        if (!task) {
            throw new common_1.NotFoundException(`Task with ID ${id} not found`);
        }
        return task;
    }
    async findByProject(projectId) {
        const tasks = await this.prisma.task.findMany({
            where: { projectId },
            include: {
                createdBy: {
                    select: {
                        id: true,
                        fullName: true,
                        email: true,
                        username: true,
                    },
                },
                assignedTo: {
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
        return tasks;
    }
    async findByStatus(status) {
        const tasks = await this.prisma.task.findMany({
            where: { status },
            include: {
                project: {
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
                assignedTo: {
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
        return tasks;
    }
    async findByAssignee(assignedToUserId) {
        const tasks = await this.prisma.task.findMany({
            where: { assignedToUserId },
            include: {
                project: {
                    select: {
                        id: true,
                        name: true,
                        status: true,
                        office: {
                            select: {
                                id: true,
                                name: true,
                            },
                        },
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
            },
            orderBy: {
                dueDate: 'asc',
            },
        });
        return tasks;
    }
    async findByCreator(createdByUserId) {
        const tasks = await this.prisma.task.findMany({
            where: { createdByUserId },
            include: {
                project: {
                    select: {
                        id: true,
                        name: true,
                        status: true,
                    },
                },
                assignedTo: {
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
        return tasks;
    }
    async findOverdue() {
        const tasks = await this.prisma.task.findMany({
            where: {
                dueDate: {
                    lt: new Date(),
                },
                status: {
                    not: client_1.TaskStatus.DONE,
                },
            },
            include: {
                project: {
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
                    },
                },
                assignedTo: {
                    select: {
                        id: true,
                        fullName: true,
                        email: true,
                    },
                },
            },
            orderBy: {
                dueDate: 'asc',
            },
        });
        return tasks;
    }
    async update(id, updateTaskDto) {
        const existingTask = await this.prisma.task.findUnique({
            where: { id },
        });
        if (!existingTask) {
            throw new common_1.NotFoundException(`Task with ID ${id} not found`);
        }
        if (updateTaskDto.assignedToUserId) {
            const assignee = await this.prisma.user.findUnique({
                where: { id: updateTaskDto.assignedToUserId },
            });
            if (!assignee) {
                throw new common_1.NotFoundException(`Assignee user with ID ${updateTaskDto.assignedToUserId} not found`);
            }
        }
        const updateData = { ...updateTaskDto };
        if (updateTaskDto.dueDate) {
            updateData.dueDate = new Date(updateTaskDto.dueDate);
        }
        const updatedTask = await this.prisma.task.update({
            where: { id },
            data: updateData,
            include: {
                project: {
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
                assignedTo: {
                    select: {
                        id: true,
                        fullName: true,
                        email: true,
                        username: true,
                    },
                },
            },
        });
        return updatedTask;
    }
    async remove(id, hardDelete = false) {
        const task = await this.prisma.task.findUnique({
            where: { id },
        });
        if (!task) {
            throw new common_1.NotFoundException(`Task with ID ${id} not found`);
        }
        if (hardDelete) {
            await this.prisma.task.delete({
                where: { id },
            });
            return { message: 'Task permanently deleted' };
        }
        else {
            const cancelledTask = await this.prisma.task.update({
                where: { id },
                data: { status: client_1.TaskStatus.CANCELLED },
                include: {
                    project: {
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
                    assignedTo: {
                        select: {
                            id: true,
                            fullName: true,
                            email: true,
                        },
                    },
                },
            });
            return cancelledTask;
        }
    }
};
exports.TasksService = TasksService;
exports.TasksService = TasksService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TasksService);
//# sourceMappingURL=tasks.service.js.map