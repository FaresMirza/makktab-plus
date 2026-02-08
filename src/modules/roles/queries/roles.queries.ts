import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '../../../../prisma/src/generated/prisma-client/client';

@Injectable()
export class RolesRepository {
    constructor(private readonly prisma: PrismaService) { }

    async create(data: Prisma.RoleCreateInput) {
        return this.prisma.role.create({
            data,
        });
    }

    async findAll() {
        return this.prisma.role.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });
    }

    async findById(id: string) {
        return this.prisma.role.findUnique({
            where: { id },
        });
    }

    async findByKey(key: string) {
        return this.prisma.role.findUnique({
            where: { key },
        });
    }

    async findByScope(scope: string) {
        return this.prisma.role.findMany({
            where: { scope },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }

    async update(id: string, data: Prisma.RoleUpdateInput) {
        return this.prisma.role.update({
            where: { id },
            data,
        });
    }

    async delete(id: string) {
        return this.prisma.role.delete({
            where: { id },
        });
    }
}
