import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma, OfficeStatus } from '../../../../prisma/src/generated/prisma-client/client';

@Injectable()
export class AdminsRepository {
    constructor(private readonly prisma: PrismaService) { }

    // ─── SELECTS & INCLUDES ───────────────────────────────────

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

    // ─── QUERIES ──────────────────────────────────────────────

    /**
     * Get all offices with owner info and counts
     */
    async findAllOffices() {
        return this.prisma.office.findMany({
            include: this.officeListInclude,
            orderBy: { createdAt: 'desc' },
        });
    }

    /**
     * Get full office details by publicId
     */
    async findOfficeByPublicId(publicId: string) {
        return this.prisma.office.findUnique({
            where: { publicId },
            include: this.officeDetailInclude,
        });
    }

    /**
     * Simple office lookup by publicId (no relations)
     */
    async findOfficeByPublicIdSimple(publicId: string) {
        return this.prisma.office.findUnique({
            where: { publicId },
        });
    }

    /**
     * Update office status by internal id
     */
    async updateOfficeStatus(id: number, status: OfficeStatus) {
        return this.prisma.office.update({
            where: { id },
            data: { status },
            include: this.officeListInclude,
        });
    }
}
