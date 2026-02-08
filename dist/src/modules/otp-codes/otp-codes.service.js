"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpCodesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = __importStar(require("bcrypt"));
let OtpCodesService = class OtpCodesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createOtpCodeDto) {
        const { userId, officeId, purpose, channel, code, ...rest } = createOtpCodeDto;
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
        const saltRounds = 10;
        const codeHash = await bcrypt.hash(code, saltRounds);
        const expiresAt = new Date();
        expiresAt.setMinutes(expiresAt.getMinutes() + 10);
        const otpCode = await this.prisma.otpCode.create({
            data: {
                userId,
                officeId,
                purpose,
                channel,
                codeHash,
                attempts: rest.attempts ?? 0,
                deviceFingerprint: rest.deviceFingerprint,
                ip: rest.ip,
                userAgent: rest.userAgent,
                emailSnapshot: rest.emailSnapshot || user.email,
                phoneSnapshot: rest.phoneSnapshot || user.phone,
                expiresAt,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        fullName: true,
                        email: true,
                        phone: true,
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
        const { codeHash: _, ...otpWithoutHash } = otpCode;
        return otpWithoutHash;
    }
    async verify(verifyOtpCodeDto) {
        const { code, userId, officeId } = verifyOtpCodeDto;
        const otpCode = await this.prisma.otpCode.findFirst({
            where: {
                userId,
                officeId,
                usedAt: null,
                expiresAt: {
                    gt: new Date(),
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        if (!otpCode) {
            throw new common_1.BadRequestException('No valid OTP found or OTP has expired');
        }
        await this.prisma.otpCode.update({
            where: { id: otpCode.id },
            data: {
                attempts: otpCode.attempts + 1,
            },
        });
        if (otpCode.attempts >= 3) {
            throw new common_1.BadRequestException('Too many verification attempts. Please request a new OTP.');
        }
        const isValid = await bcrypt.compare(code, otpCode.codeHash);
        if (!isValid) {
            throw new common_1.BadRequestException('Invalid OTP code');
        }
        await this.prisma.otpCode.update({
            where: { id: otpCode.id },
            data: {
                usedAt: new Date(),
            },
        });
        return {
            success: true,
            message: 'OTP verified successfully',
        };
    }
    async findAll() {
        const otpCodes = await this.prisma.otpCode.findMany({
            include: {
                user: {
                    select: {
                        id: true,
                        fullName: true,
                        email: true,
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
        return otpCodes;
    }
    async findOne(id) {
        const otpCode = await this.prisma.otpCode.findUnique({
            where: { id },
            include: {
                user: {
                    select: {
                        id: true,
                        fullName: true,
                        email: true,
                        phone: true,
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
        if (!otpCode) {
            throw new common_1.NotFoundException(`OTP code with ID ${id} not found`);
        }
        return otpCode;
    }
    async findByUser(userId) {
        const otpCodes = await this.prisma.otpCode.findMany({
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
        return otpCodes;
    }
    async findByPurpose(purpose) {
        const otpCodes = await this.prisma.otpCode.findMany({
            where: { purpose },
            include: {
                user: {
                    select: {
                        id: true,
                        fullName: true,
                        email: true,
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
        return otpCodes;
    }
    async findExpired() {
        const otpCodes = await this.prisma.otpCode.findMany({
            where: {
                expiresAt: {
                    lt: new Date(),
                },
                usedAt: null,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        fullName: true,
                        email: true,
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
        return otpCodes;
    }
    async remove(id) {
        const otpCode = await this.prisma.otpCode.findUnique({
            where: { id },
        });
        if (!otpCode) {
            throw new common_1.NotFoundException(`OTP code with ID ${id} not found`);
        }
        await this.prisma.otpCode.delete({
            where: { id },
        });
        return { message: 'OTP code deleted successfully' };
    }
};
exports.OtpCodesService = OtpCodesService;
exports.OtpCodesService = OtpCodesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OtpCodesService);
//# sourceMappingURL=otp-codes.service.js.map