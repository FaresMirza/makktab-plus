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
            where: {
                NOT: {
                    owner: {
                        roles: {
                            hasSome: ['admin', 'super_admin'],
                        },
                    },
                },
            },
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
     * Office snapshot for irreversible deletion checks and cleanup.
     */
    async findOfficeByPublicIdForPermanentDelete(publicId: string) {
        return this.prisma.office.findUnique({
            where: { publicId },
            include: {
                owner: {
                    select: {
                        id: true,
                        publicId: true,
                        fullName: true,
                        email: true,
                        roles: true,
                        offices: {
                            select: {
                                id: true,
                                publicId: true,
                                name: true,
                            },
                        },
                        ownedOffice: {
                            select: {
                                id: true,
                                publicId: true,
                                name: true,
                            },
                        },
                    },
                },
                users: {
                    select: {
                        id: true,
                        publicId: true,
                        fullName: true,
                        email: true,
                        roles: true,
                        offices: {
                            select: {
                                id: true,
                                publicId: true,
                                name: true,
                            },
                        },
                        ownedOffice: {
                            select: {
                                id: true,
                                publicId: true,
                                name: true,
                            },
                        },
                    },
                },
                projects: {
                    select: {
                        id: true,
                        publicId: true,
                        name: true,
                    },
                },
            },
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

    async permanentlyDeleteOfficeWithRelations(
        officeId: number,
        projectIds: number[],
        userIds: number[],
    ) {
        return this.prisma.$transaction(async (tx) => {
            await tx.adminAuditLog.deleteMany({
                where: { targetOfficeId: officeId },
            });
            await tx.otpCode.deleteMany({
                where: { officeId },
            });
            await tx.taskAuditLog.deleteMany({
                where: { officeId },
            });
            await tx.projectAuditLog.deleteMany({
                where: { officeId },
            });

            if (projectIds.length > 0) {
                await tx.projectFile.deleteMany({
                    where: {
                        projectId: { in: projectIds },
                    },
                });
                await tx.task.deleteMany({
                    where: {
                        projectId: { in: projectIds },
                    },
                });
                await tx.project.deleteMany({
                    where: {
                        id: { in: projectIds },
                    },
                });
            }

            await tx.office.update({
                where: { id: officeId },
                data: {
                    users: {
                        set: [],
                    },
                },
            });

            await tx.office.delete({
                where: { id: officeId },
            });

            if (userIds.length > 0) {
                await tx.otpCode.deleteMany({
                    where: {
                        userId: { in: userIds },
                    },
                });
                await tx.authAuditLog.deleteMany({
                    where: {
                        userId: { in: userIds },
                    },
                });
                await tx.adminAuditLog.deleteMany({
                    where: {
                        adminUserId: { in: userIds },
                    },
                });
                await tx.projectAuditLog.deleteMany({
                    where: {
                        actorUserId: { in: userIds },
                    },
                });
                await tx.taskAuditLog.deleteMany({
                    where: {
                        actorUserId: { in: userIds },
                    },
                });
                await tx.user.deleteMany({
                    where: {
                        id: { in: userIds },
                    },
                });
            }
        });
    }

    // ─── OFFICE REQUEST QUERIES ───────────────────────────────

    /**
     * Get pending office requests visible to admins.
     *
     * We filter to email-verified requests only — a row is created the
     * moment the user submits the form (so we can store the hashed
     * password etc.), but it's not surfaced to the platform admin until
     * the user has confirmed their email via OTP. Unverified rows are
     * effectively invisible drafts.
     */
    async findPendingOfficeRequests() {
        return this.prisma.officeRequest.findMany({
            where: { status: null, emailVerified: true },
            select: {
                id: true,
                officeName: true,
                fullName: true,
                email: true,
                phone: true,
                username: true,
                city: true,
                registrationNumber: true,
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
        city: string;
        registrationNumber: string;
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
                    city: request.city,
                    registrationNumber: request.registrationNumber,
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
