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
exports.LoginAttemptsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let LoginAttemptsService = class LoginAttemptsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createLoginAttemptDto) {
        const { userId, officeId, success, method, ...rest } = createLoginAttemptDto;
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${userId} not found`);
        }
        const office = await this.prisma.office.findUnique({
            where: { id: officeId },
        });
        if (!office) {
            throw new common_1.NotFoundException(`Office with ID ${officeId} not found`);
        }
        const loginAttempt = await this.prisma.loginAttempt.create({
            data: {
                userId,
                officeId,
                success,
                method,
                ip: rest.ip,
                userAgent: rest.userAgent,
                deviceFingerprint: rest.deviceFingerprint,
                geo: rest.geo,
                failReason: rest.failReason,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        fullName: true,
                        email: true,
                        username: true,
                    },
                },
                office: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });
        return loginAttempt;
    }
    async findAll() {
        const loginAttempts = await this.prisma.loginAttempt.findMany({
            include: {
                user: {
                    select: {
                        id: true,
                        fullName: true,
                        email: true,
                        username: true,
                    },
                },
                office: {
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
        return loginAttempts;
    }
    async findOne(id) {
        const loginAttempt = await this.prisma.loginAttempt.findUnique({
            where: { id },
            include: {
                user: {
                    select: {
                        id: true,
                        fullName: true,
                        email: true,
                        username: true,
                    },
                },
                office: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });
        if (!loginAttempt) {
            throw new common_1.NotFoundException(`Login attempt with ID ${id} not found`);
        }
        return loginAttempt;
    }
    async findByUser(userId) {
        const loginAttempts = await this.prisma.loginAttempt.findMany({
            where: { userId },
            include: {
                office: {
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
        return loginAttempts;
    }
    async findByOffice(officeId) {
        const loginAttempts = await this.prisma.loginAttempt.findMany({
            where: { officeId },
            include: {
                user: {
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
        return loginAttempts;
    }
    async findFailed() {
        const loginAttempts = await this.prisma.loginAttempt.findMany({
            where: { success: false },
            include: {
                user: {
                    select: {
                        id: true,
                        fullName: true,
                        email: true,
                        username: true,
                    },
                },
                office: {
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
        return loginAttempts;
    }
    async findSuccessful() {
        const loginAttempts = await this.prisma.loginAttempt.findMany({
            where: { success: true },
            include: {
                user: {
                    select: {
                        id: true,
                        fullName: true,
                        email: true,
                        username: true,
                    },
                },
                office: {
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
        return loginAttempts;
    }
    async findByMethod(method) {
        const loginAttempts = await this.prisma.loginAttempt.findMany({
            where: { method },
            include: {
                user: {
                    select: {
                        id: true,
                        fullName: true,
                        email: true,
                        username: true,
                    },
                },
                office: {
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
        return loginAttempts;
    }
    async getUserStatistics(userId) {
        const total = await this.prisma.loginAttempt.count({
            where: { userId },
        });
        const successful = await this.prisma.loginAttempt.count({
            where: { userId, success: true },
        });
        const failed = await this.prisma.loginAttempt.count({
            where: { userId, success: false },
        });
        return {
            userId,
            statistics: {
                total,
                successful,
                failed,
                successRate: total > 0 ? ((successful / total) * 100).toFixed(2) + '%' : '0%',
            },
        };
    }
    async remove(id) {
        const loginAttempt = await this.prisma.loginAttempt.findUnique({
            where: { id },
        });
        if (!loginAttempt) {
            throw new common_1.NotFoundException(`Login attempt with ID ${id} not found`);
        }
        await this.prisma.loginAttempt.delete({
            where: { id },
        });
        return { message: 'Login attempt deleted successfully' };
    }
};
exports.LoginAttemptsService = LoginAttemptsService;
exports.LoginAttemptsService = LoginAttemptsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LoginAttemptsService);
//# sourceMappingURL=login-attempts.service.js.map