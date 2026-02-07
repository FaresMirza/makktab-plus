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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = __importStar(require("bcrypt"));
const client_1 = require("../../../prisma/src/generated/prisma-client/client");
let UsersService = class UsersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createUserDto) {
        const { password, email, username, officeId, ...rest } = createUserDto;
        const existingUsername = await this.prisma.user.findUnique({
            where: { username },
        });
        if (existingUsername) {
            throw new common_1.ConflictException('Username already exists');
        }
        const existingEmail = await this.prisma.user.findUnique({
            where: { email },
        });
        if (existingEmail) {
            throw new common_1.ConflictException('Email already exists');
        }
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);
        const userData = {
            ...rest,
            email,
            username,
            passwordHash,
            status: rest.status || client_1.UserStatus.PENDING,
            roles: rest.roles || [],
        };
        if (officeId) {
            userData.offices = {
                connect: { id: officeId },
            };
        }
        const user = await this.prisma.user.create({
            data: userData,
            include: {
                offices: true,
            },
        });
        const { passwordHash: _, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
    async findAll() {
        const users = await this.prisma.user.findMany({
            include: {
                offices: true,
                ownedOffice: true,
            },
        });
        return users.map(({ passwordHash, ...user }) => user);
    }
    async findOne(id) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            include: {
                offices: true,
                ownedOffice: true,
                createdProjects: true,
                managedProjects: true,
            },
        });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        }
        const { passwordHash, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
    async findByUsername(username) {
        const user = await this.prisma.user.findUnique({
            where: { username },
            include: {
                offices: true,
                ownedOffice: true,
            },
        });
        if (!user) {
            throw new common_1.NotFoundException(`User with username ${username} not found`);
        }
        return user;
    }
    async findByEmail(email) {
        const user = await this.prisma.user.findUnique({
            where: { email },
            include: {
                offices: true,
                ownedOffice: true,
            },
        });
        if (!user) {
            throw new common_1.NotFoundException(`User with email ${email} not found`);
        }
        const { passwordHash, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
    async update(id, updateUserDto) {
        const existingUser = await this.prisma.user.findUnique({
            where: { id },
        });
        if (!existingUser) {
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        }
        const { password, email, username, ...rest } = updateUserDto;
        if (username && username !== existingUser.username) {
            const usernameExists = await this.prisma.user.findUnique({
                where: { username },
            });
            if (usernameExists) {
                throw new common_1.ConflictException('Username already exists');
            }
        }
        if (email && email !== existingUser.email) {
            const emailExists = await this.prisma.user.findUnique({
                where: { email },
            });
            if (emailExists) {
                throw new common_1.ConflictException('Email already exists');
            }
        }
        const updateData = { ...rest };
        if (email)
            updateData.email = email;
        if (username)
            updateData.username = username;
        if (password) {
            const saltRounds = 10;
            updateData.passwordHash = await bcrypt.hash(password, saltRounds);
        }
        const updatedUser = await this.prisma.user.update({
            where: { id },
            data: updateData,
            include: {
                offices: true,
                ownedOffice: true,
            },
        });
        const { passwordHash, ...userWithoutPassword } = updatedUser;
        return userWithoutPassword;
    }
    async remove(id, hardDelete = false) {
        const user = await this.prisma.user.findUnique({
            where: { id },
        });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        }
        if (hardDelete) {
            await this.prisma.user.delete({
                where: { id },
            });
            return { message: 'User permanently deleted' };
        }
        else {
            const deactivatedUser = await this.prisma.user.update({
                where: { id },
                data: { status: client_1.UserStatus.DEACTIVATED },
            });
            const { passwordHash, ...userWithoutPassword } = deactivatedUser;
            return userWithoutPassword;
        }
    }
    async verifyPassword(username, password) {
        const user = await this.findByUsername(username);
        return bcrypt.compare(password, user.passwordHash);
    }
    async changePassword(id, oldPassword, newPassword) {
        const user = await this.prisma.user.findUnique({
            where: { id },
        });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        }
        const isValidPassword = await bcrypt.compare(oldPassword, user.passwordHash);
        if (!isValidPassword) {
            throw new common_1.BadRequestException('Invalid old password');
        }
        const saltRounds = 10;
        const newPasswordHash = await bcrypt.hash(newPassword, saltRounds);
        await this.prisma.user.update({
            where: { id },
            data: { passwordHash: newPasswordHash },
        });
        return { message: 'Password changed successfully' };
    }
    async findByOffice(officeId) {
        const users = await this.prisma.user.findMany({
            where: {
                offices: {
                    some: { id: officeId },
                },
            },
            include: {
                offices: true,
            },
        });
        return users.map(({ passwordHash, ...user }) => user);
    }
    async findByRole(role) {
        const users = await this.prisma.user.findMany({
            where: {
                roles: {
                    has: role,
                },
            },
            include: {
                offices: true,
            },
        });
        return users.map(({ passwordHash, ...user }) => user);
    }
    async findByStatus(status) {
        const users = await this.prisma.user.findMany({
            where: { status },
            include: {
                offices: true,
            },
        });
        return users.map(({ passwordHash, ...user }) => user);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map