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
exports.OfficesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("../../../prisma/src/generated/prisma-client/client");
let OfficesService = class OfficesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createOfficeDto) {
        const { ownerUserId, name, status } = createOfficeDto;
        const user = await this.prisma.user.findUnique({
            where: { id: ownerUserId },
        });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${ownerUserId} not found`);
        }
        const existingOffice = await this.prisma.office.findUnique({
            where: { ownerUserId },
        });
        if (existingOffice) {
            throw new common_1.ConflictException('User already owns an office');
        }
        const office = await this.prisma.office.create({
            data: {
                name,
                ownerUserId,
                status: status || client_1.OfficeStatus.ACTIVE,
            },
            include: {
                owner: {
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
        return office;
    }
    async findAll() {
        const offices = await this.prisma.office.findMany({
            include: {
                owner: {
                    select: {
                        id: true,
                        fullName: true,
                        email: true,
                        username: true,
                        status: true,
                    },
                },
                _count: {
                    select: {
                        users: true,
                        projects: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        return offices;
    }
    async findOne(id) {
        const office = await this.prisma.office.findUnique({
            where: { id },
            include: {
                owner: {
                    select: {
                        id: true,
                        fullName: true,
                        email: true,
                        username: true,
                        status: true,
                    },
                },
                users: {
                    select: {
                        id: true,
                        fullName: true,
                        email: true,
                        username: true,
                        status: true,
                        roles: true,
                    },
                },
                projects: {
                    select: {
                        id: true,
                        name: true,
                        description: true,
                        status: true,
                        createdAt: true,
                    },
                },
            },
        });
        if (!office) {
            throw new common_1.NotFoundException(`Office with ID ${id} not found`);
        }
        return office;
    }
    async findByOwner(ownerUserId) {
        const office = await this.prisma.office.findUnique({
            where: { ownerUserId },
            include: {
                owner: {
                    select: {
                        id: true,
                        fullName: true,
                        email: true,
                        username: true,
                        status: true,
                    },
                },
                _count: {
                    select: {
                        users: true,
                        projects: true,
                    },
                },
            },
        });
        if (!office) {
            throw new common_1.NotFoundException(`No office found for user with ID ${ownerUserId}`);
        }
        return office;
    }
    async findByStatus(status) {
        const offices = await this.prisma.office.findMany({
            where: { status },
            include: {
                owner: {
                    select: {
                        id: true,
                        fullName: true,
                        email: true,
                        username: true,
                        status: true,
                    },
                },
                _count: {
                    select: {
                        users: true,
                        projects: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        return offices;
    }
    async update(id, updateOfficeDto) {
        const existingOffice = await this.prisma.office.findUnique({
            where: { id },
        });
        if (!existingOffice) {
            throw new common_1.NotFoundException(`Office with ID ${id} not found`);
        }
        const updatedOffice = await this.prisma.office.update({
            where: { id },
            data: updateOfficeDto,
            include: {
                owner: {
                    select: {
                        id: true,
                        fullName: true,
                        email: true,
                        username: true,
                        status: true,
                    },
                },
                _count: {
                    select: {
                        users: true,
                        projects: true,
                    },
                },
            },
        });
        return updatedOffice;
    }
    async remove(id, hardDelete = false) {
        const office = await this.prisma.office.findUnique({
            where: { id },
            include: {
                _count: {
                    select: {
                        users: true,
                        projects: true,
                    },
                },
            },
        });
        if (!office) {
            throw new common_1.NotFoundException(`Office with ID ${id} not found`);
        }
        if (hardDelete) {
            if (office._count.users > 0 || office._count.projects > 0) {
                throw new common_1.ConflictException('Cannot permanently delete office with existing users or projects. Please remove them first.');
            }
            await this.prisma.office.delete({
                where: { id },
            });
            return { message: 'Office permanently deleted' };
        }
        else {
            const suspendedOffice = await this.prisma.office.update({
                where: { id },
                data: { status: client_1.OfficeStatus.SUSPENDED },
                include: {
                    owner: {
                        select: {
                            id: true,
                            fullName: true,
                            email: true,
                            username: true,
                        },
                    },
                },
            });
            return suspendedOffice;
        }
    }
    async getStatistics(id) {
        const office = await this.prisma.office.findUnique({
            where: { id },
            include: {
                _count: {
                    select: {
                        users: true,
                        projects: true,
                        otpCodes: true,
                        loginAttempts: true,
                    },
                },
            },
        });
        if (!office) {
            throw new common_1.NotFoundException(`Office with ID ${id} not found`);
        }
        return {
            officeId: office.id,
            officeName: office.name,
            status: office.status,
            statistics: {
                totalUsers: office._count.users,
                totalProjects: office._count.projects,
                totalOtpCodes: office._count.otpCodes,
                totalLoginAttempts: office._count.loginAttempts,
            },
        };
    }
};
exports.OfficesService = OfficesService;
exports.OfficesService = OfficesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OfficesService);
//# sourceMappingURL=offices.service.js.map