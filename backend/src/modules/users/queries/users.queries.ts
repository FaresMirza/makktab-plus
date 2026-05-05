import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma, UserStatus } from '../../../../prisma/src/generated/prisma-client/client';

@Injectable()
export class UsersRepository {
    constructor(private readonly prisma: PrismaService) { }

    private get userListInclude(): Prisma.UserInclude {
        return {
            offices: true,
            ownedOffice: true,
        };
    }

    private get userDetailInclude(): Prisma.UserInclude {
        return {
            offices: true,
            ownedOffice: true,
            createdProjects: true,
            managedProjects: true,
        };
    }

    async create(data: Prisma.UserCreateInput) {
        return this.prisma.user.create({
            data,
            include: {
                offices: true,
            },
        });
    }

    async findAll() {
        return this.prisma.user.findMany({
            include: this.userListInclude,
        });
    }

    async findById(id: number) {
        return this.prisma.user.findUnique({
            where: { id },
            include: this.userDetailInclude,
        });
    }

    async findByPublicId(publicId: string) {
        return this.prisma.user.findUnique({
            where: { publicId },
            include: this.userDetailInclude,
        });
    }

    async findByIdSimple(id: number) {
        return this.prisma.user.findUnique({
            where: { id },
        });
    }

    async findByPublicIdSimple(publicId: string) {
        return this.prisma.user.findUnique({
            where: { publicId },
        });
    }

    async findByUsername(username: string) {
        return this.prisma.user.findUnique({
            where: { username },
            include: this.userListInclude,
        });
    }

    async findByUsernameSimple(username: string) {
        return this.prisma.user.findUnique({
            where: { username },
        });
    }

    async findByEmail(email: string) {
        return this.prisma.user.findFirst({
            where: { email },
            include: this.userListInclude,
        });
    }

    async findByEmailSimple(email: string) {
        return this.prisma.user.findFirst({
            where: { email },
        });
    }

    async update(id: number, data: Prisma.UserUpdateInput) {
        return this.prisma.user.update({
            where: { id },
            data,
            include: this.userListInclude,
        });
    }

    async delete(id: number) {
        return this.prisma.user.delete({
            where: { id },
        });
    }

    async softDelete(id: number) {
        return this.prisma.user.update({
            where: { id },
            data: { status: UserStatus.DEACTIVATED },
        });
    }

    async updatePassword(id: number, passwordHash: string) {
        return this.prisma.user.update({
            where: { id },
            data: {
                passwordHash,
                lastPasswordChange: new Date(),
            },
        });
    }

    async updateRefreshTokenHash(id: number, refreshTokenHash: string | null) {
        return this.prisma.user.update({
            where: { id },
            data: { refreshTokenHash },
        });
    }

    async findByOffice(officeId: number) {
        return this.prisma.user.findMany({
            where: {
                offices: {
                    some: { id: officeId },
                },
            },
            include: {
                offices: true,
            },
        });
    }

    async findByRole(role: string) {
        return this.prisma.user.findMany({
            where: {
                roles: {
                    has: role,
                },
            },
            include: {
                offices: true,
            },
        });
    }

    async findByStatus(status: UserStatus) {
        return this.prisma.user.findMany({
            where: { status },
            include: {
                offices: true,
            },
        });
    }
}
