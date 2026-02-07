import { PrismaService } from '../prisma/prisma.service';
import { CreateOfficeDto } from './dto/create-office.dto';
import { UpdateOfficeDto } from './dto/update-office.dto';
import { OfficeStatus } from 'prisma/src/generated/prisma-client/client';
export declare class OfficesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createOfficeDto: CreateOfficeDto): Promise<{
        owner: {
            fullName: string;
            email: string;
            username: string;
            status: import("prisma/src/generated/prisma-client/client").UserStatus;
            id: string;
        };
    } & {
        status: OfficeStatus;
        id: string;
        createdAt: Date;
        name: string;
        ownerUserId: string;
    }>;
    findAll(): Promise<({
        _count: {
            users: number;
            projects: number;
        };
        owner: {
            fullName: string;
            email: string;
            username: string;
            status: import("prisma/src/generated/prisma-client/client").UserStatus;
            id: string;
        };
    } & {
        status: OfficeStatus;
        id: string;
        createdAt: Date;
        name: string;
        ownerUserId: string;
    })[]>;
    findOne(id: string): Promise<{
        owner: {
            fullName: string;
            email: string;
            username: string;
            status: import("prisma/src/generated/prisma-client/client").UserStatus;
            id: string;
        };
        users: {
            fullName: string;
            email: string;
            username: string;
            roles: string[];
            status: import("prisma/src/generated/prisma-client/client").UserStatus;
            id: string;
        }[];
        projects: {
            description: string | null;
            status: import("prisma/src/generated/prisma-client/client").ProjectStatus;
            id: string;
            createdAt: Date;
            name: string;
        }[];
    } & {
        status: OfficeStatus;
        id: string;
        createdAt: Date;
        name: string;
        ownerUserId: string;
    }>;
    findByOwner(ownerUserId: string): Promise<{
        _count: {
            users: number;
            projects: number;
        };
        owner: {
            fullName: string;
            email: string;
            username: string;
            status: import("prisma/src/generated/prisma-client/client").UserStatus;
            id: string;
        };
    } & {
        status: OfficeStatus;
        id: string;
        createdAt: Date;
        name: string;
        ownerUserId: string;
    }>;
    findByStatus(status: OfficeStatus): Promise<({
        _count: {
            users: number;
            projects: number;
        };
        owner: {
            fullName: string;
            email: string;
            username: string;
            status: import("prisma/src/generated/prisma-client/client").UserStatus;
            id: string;
        };
    } & {
        status: OfficeStatus;
        id: string;
        createdAt: Date;
        name: string;
        ownerUserId: string;
    })[]>;
    update(id: string, updateOfficeDto: UpdateOfficeDto): Promise<{
        _count: {
            users: number;
            projects: number;
        };
        owner: {
            fullName: string;
            email: string;
            username: string;
            status: import("prisma/src/generated/prisma-client/client").UserStatus;
            id: string;
        };
    } & {
        status: OfficeStatus;
        id: string;
        createdAt: Date;
        name: string;
        ownerUserId: string;
    }>;
    remove(id: string, hardDelete?: boolean): Promise<({
        owner: {
            fullName: string;
            email: string;
            username: string;
            id: string;
        };
    } & {
        status: OfficeStatus;
        id: string;
        createdAt: Date;
        name: string;
        ownerUserId: string;
    }) | {
        message: string;
    }>;
    getStatistics(id: string): Promise<{
        officeId: string;
        officeName: string;
        status: OfficeStatus;
        statistics: {
            totalUsers: number;
            totalProjects: number;
            totalOtpCodes: number;
            totalLoginAttempts: number;
        };
    }>;
}
