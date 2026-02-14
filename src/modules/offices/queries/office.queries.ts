import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma, OfficeStatus } from '../../../../prisma/src/generated/prisma-client/client';

@Injectable()
export class OfficesRepository {
    private get ownerSelect(): Prisma.UserSelect {
        return {
            id: true,
            publicId: true,
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
                    publicId: true,
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
                    publicId: true,
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

    async findById(id: number) {
        return this.prisma.office.findUnique({
            where: { id },
            include: this.officeDetailInclude,
        });
    }

    async findByPublicId(publicId: string) {
        return this.prisma.office.findUnique({
            where: { publicId },
            include: this.officeDetailInclude,
        });
    }

    async findByIdWithCounts(id: number) {
        return this.prisma.office.findUnique({
            where: { id },
            include: this.officeCountInclude,
        });
    }

    async findByPublicIdWithCounts(publicId: string) {
        return this.prisma.office.findUnique({
            where: { publicId },
            include: this.officeCountInclude,
        });
    }

    async findByIdWithStatistics(id: number) {
        return this.prisma.office.findUnique({
            where: { id },
            include: this.officeStatisticsInclude,
        });
    }

    async findByPublicIdWithStatistics(publicId: string) {
        return this.prisma.office.findUnique({
            where: { publicId },
            include: this.officeStatisticsInclude,
        });
    }

    async findByIdSimple(id: number) {
        return this.prisma.office.findUnique({
            where: { id },
        });
    }

    async findByPublicIdSimple(publicId: string) {
        return this.prisma.office.findUnique({
            where: { publicId },
        });
    }

    async findByOwnerSimple(ownerUserId: number) {
        return this.prisma.office.findUnique({
            where: { ownerUserId },
        });
    }

    async findByOwner(ownerUserId: number) {
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

    async update(id: number, data: Prisma.OfficeUncheckedUpdateInput) {
        return this.prisma.office.update({
            where: { id },
            data,
            include: this.officeListInclude,
        });
    }

    async delete(id: number) {
        return this.prisma.office.delete({
            where: { id },
        });
    }

    async softDelete(id: number) {
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
