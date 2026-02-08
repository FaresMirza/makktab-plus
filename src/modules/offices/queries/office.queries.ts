import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma, OfficeStatus } from '../../../../prisma/src/generated/prisma-client/client';

@Injectable()
export class OfficesRepository {
    private get ownerSelect(): Prisma.UserSelect {
        return {
            id: true,
            fullName: true,
            email: true,
            username: true,
            status: true,
        };
    }

    private get officeCountInclude(): Prisma.OfficeInclude {
        return {
            _count: {
                select: {
                    users: true,
                    projects: true,
                },
            },
        };
    }

    private get officeStatisticsInclude(): Prisma.OfficeInclude {
        return {
            _count: {
                select: {
                    users: true,
                    projects: true,
                    otpCodes: true,
                    loginAttempts: true,
                },
            },
        };
    }

    private get officeListInclude(): Prisma.OfficeInclude {
        return {
            owner: {
                select: this.ownerSelect,
            },
            _count: {
                select: {
                    users: true,
                    projects: true,
                },
            },
        };
    }

    private get officeDetailInclude(): Prisma.OfficeInclude {
        return {
            owner: {
                select: this.ownerSelect,
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
        };
    }

    constructor(private readonly prisma: PrismaService) { }

    async create(data: Prisma.OfficeUncheckedCreateInput) {
        return this.prisma.office.create({
            data,
            include: {
                owner: {
                    select: this.ownerSelect,
                },
            },
        });
    }

    async findAll() {
        return this.prisma.office.findMany({
            include: this.officeListInclude,
            orderBy: {
                createdAt: 'desc',
            },
        });
    }

    async findById(id: string) {
        return this.prisma.office.findUnique({
            where: { id },
            include: this.officeDetailInclude,
        });
    }

    async findByIdWithCounts(id: string) {
        return this.prisma.office.findUnique({
            where: { id },
            include: this.officeCountInclude,
        });
    }

    async findByIdWithStatistics(id: string) {
        return this.prisma.office.findUnique({
            where: { id },
            include: this.officeStatisticsInclude,
        });
    }

    async findByIdSimple(id: string) {
        return this.prisma.office.findUnique({
            where: { id },
        });
    }

    async findByOwnerSimple(ownerUserId: string) {
        return this.prisma.office.findUnique({
            where: { ownerUserId },
        });
    }

    async findByOwner(ownerUserId: string) { // Original method
        return this.prisma.office.findUnique({
            where: { ownerUserId },
            include: this.officeListInclude,
        });
    }

    async findByStatus(status: OfficeStatus) {
        return this.prisma.office.findMany({
            where: { status },
            include: this.officeListInclude,
            orderBy: {
                createdAt: 'desc',
            },
        });
    }

    async update(id: string, data: Prisma.OfficeUncheckedUpdateInput) {
        return this.prisma.office.update({
            where: { id },
            data,
            include: this.officeListInclude,
        });
    }

    async delete(id: string) {
        return this.prisma.office.delete({
            where: { id },
        });
    }

    async softDelete(id: string) {
        return this.prisma.office.update({
            where: { id },
            data: { status: OfficeStatus.SUSPENDED },
            include: {
                owner: {
                    select: this.ownerSelect,
                },
            },
        });
    }
}
