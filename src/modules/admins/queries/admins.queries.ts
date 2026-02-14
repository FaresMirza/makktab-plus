import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma, OfficeStatus, UserStatus } from '../../../../prisma/src/generated/prisma-client/client';

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

    // ─── OFFICE REQUEST QUERIES ───────────────────────────────

    /**
     * Get all pending office requests (status = null)
     */
    async findPendingOfficeRequests() {
        return this.prisma.officeRequest.findMany({
            where: { status: null },
            select: {
                id: true,
                officeName: true,
                fullName: true,
                email: true,
                phone: true,
                username: true,
                status: true,
                createdAt: true,
            },
            orderBy: { createdAt: 'desc' },
        });
    }

    /**
     * Find office request by id
     */
    async findOfficeRequestById(id: string) {
        return this.prisma.officeRequest.findUnique({
            where: { id },
        });
    }

    /**
     * Reject: set request status to false
     */
    async rejectOfficeRequest(id: string) {
        return this.prisma.officeRequest.update({
            where: { id },
            data: { status: false },
        });
    }

    /**
     * Approve: transaction → create User → create Office → set request status to true
     */
    async approveOfficeRequest(request: {
        id: string;
        officeName: string;
        fullName: string;
        email: string;
        phone: string;
        username: string;
        passwordHash: string;
    }) {
        return this.prisma.$transaction(async (tx) => {
            // 1. Create user
            const user = await tx.user.create({
                data: {
                    fullName: request.fullName,
                    email: request.email,
                    phone: request.phone,
                    username: request.username,
                    passwordHash: request.passwordHash,
                    roles: ['owner'],
                    status: UserStatus.ACTIVE,
                },
            });

            // 2. Create office
            const office = await tx.office.create({
                data: {
                    name: request.officeName,
                    ownerUserId: user.id,
                    status: OfficeStatus.ACTIVE,
                },
                include: {
                    owner: {
                        select: {
                            publicId: true,
                            fullName: true,
                            email: true,
                            username: true,
                        },
                    },
                },
            });

            // 3. Set request status to true
            await tx.officeRequest.update({
                where: { id: request.id },
                data: { status: true },
            });

            return office;
        });
    }
}
