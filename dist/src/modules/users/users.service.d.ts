import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserStatus } from 'prisma/src/generated/prisma-client/client';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createUserDto: CreateUserDto): Promise<{
        offices: {
            status: import("prisma/src/generated/prisma-client/client").OfficeStatus;
            id: string;
            createdAt: Date;
            name: string;
            ownerUserId: string;
        }[];
        fullName: string;
        email: string;
        phone: string;
        username: string;
        roles: string[];
        status: UserStatus;
        id: string;
        createdAt: Date;
    }>;
    findAll(): Promise<{
        offices: {
            status: import("prisma/src/generated/prisma-client/client").OfficeStatus;
            id: string;
            createdAt: Date;
            name: string;
            ownerUserId: string;
        }[];
        ownedOffice: {
            status: import("prisma/src/generated/prisma-client/client").OfficeStatus;
            id: string;
            createdAt: Date;
            name: string;
            ownerUserId: string;
        } | null;
        fullName: string;
        email: string;
        phone: string;
        username: string;
        roles: string[];
        status: UserStatus;
        id: string;
        createdAt: Date;
    }[]>;
    findOne(id: string): Promise<{
        offices: {
            status: import("prisma/src/generated/prisma-client/client").OfficeStatus;
            id: string;
            createdAt: Date;
            name: string;
            ownerUserId: string;
        }[];
        ownedOffice: {
            status: import("prisma/src/generated/prisma-client/client").OfficeStatus;
            id: string;
            createdAt: Date;
            name: string;
            ownerUserId: string;
        } | null;
        createdProjects: {
            description: string | null;
            status: import("prisma/src/generated/prisma-client/client").ProjectStatus;
            officeId: string;
            id: string;
            createdAt: Date;
            name: string;
            createdByUserId: string;
            projectManagerUserId: string;
        }[];
        managedProjects: {
            description: string | null;
            status: import("prisma/src/generated/prisma-client/client").ProjectStatus;
            officeId: string;
            id: string;
            createdAt: Date;
            name: string;
            createdByUserId: string;
            projectManagerUserId: string;
        }[];
        fullName: string;
        email: string;
        phone: string;
        username: string;
        roles: string[];
        status: UserStatus;
        id: string;
        createdAt: Date;
    }>;
    findByUsername(username: string): Promise<{
        offices: {
            status: import("prisma/src/generated/prisma-client/client").OfficeStatus;
            id: string;
            createdAt: Date;
            name: string;
            ownerUserId: string;
        }[];
        ownedOffice: {
            status: import("prisma/src/generated/prisma-client/client").OfficeStatus;
            id: string;
            createdAt: Date;
            name: string;
            ownerUserId: string;
        } | null;
    } & {
        fullName: string;
        email: string;
        phone: string;
        username: string;
        roles: string[];
        status: UserStatus;
        id: string;
        passwordHash: string;
        createdAt: Date;
    }>;
    findByEmail(email: string): Promise<{
        offices: {
            status: import("prisma/src/generated/prisma-client/client").OfficeStatus;
            id: string;
            createdAt: Date;
            name: string;
            ownerUserId: string;
        }[];
        ownedOffice: {
            status: import("prisma/src/generated/prisma-client/client").OfficeStatus;
            id: string;
            createdAt: Date;
            name: string;
            ownerUserId: string;
        } | null;
        fullName: string;
        email: string;
        phone: string;
        username: string;
        roles: string[];
        status: UserStatus;
        id: string;
        createdAt: Date;
    }>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
        offices: {
            status: import("prisma/src/generated/prisma-client/client").OfficeStatus;
            id: string;
            createdAt: Date;
            name: string;
            ownerUserId: string;
        }[];
        ownedOffice: {
            status: import("prisma/src/generated/prisma-client/client").OfficeStatus;
            id: string;
            createdAt: Date;
            name: string;
            ownerUserId: string;
        } | null;
        fullName: string;
        email: string;
        phone: string;
        username: string;
        roles: string[];
        status: UserStatus;
        id: string;
        createdAt: Date;
    }>;
    remove(id: string, hardDelete?: boolean): Promise<{
        fullName: string;
        email: string;
        phone: string;
        username: string;
        roles: string[];
        status: UserStatus;
        id: string;
        createdAt: Date;
    } | {
        message: string;
    }>;
    verifyPassword(username: string, password: string): Promise<boolean>;
    changePassword(id: string, oldPassword: string, newPassword: string): Promise<{
        message: string;
    }>;
    findByOffice(officeId: string): Promise<{
        offices: {
            status: import("prisma/src/generated/prisma-client/client").OfficeStatus;
            id: string;
            createdAt: Date;
            name: string;
            ownerUserId: string;
        }[];
        fullName: string;
        email: string;
        phone: string;
        username: string;
        roles: string[];
        status: UserStatus;
        id: string;
        createdAt: Date;
    }[]>;
    findByRole(role: string): Promise<{
        offices: {
            status: import("prisma/src/generated/prisma-client/client").OfficeStatus;
            id: string;
            createdAt: Date;
            name: string;
            ownerUserId: string;
        }[];
        fullName: string;
        email: string;
        phone: string;
        username: string;
        roles: string[];
        status: UserStatus;
        id: string;
        createdAt: Date;
    }[]>;
    findByStatus(status: UserStatus): Promise<{
        offices: {
            status: import("prisma/src/generated/prisma-client/client").OfficeStatus;
            id: string;
            createdAt: Date;
            name: string;
            ownerUserId: string;
        }[];
        fullName: string;
        email: string;
        phone: string;
        username: string;
        roles: string[];
        status: UserStatus;
        id: string;
        createdAt: Date;
    }[]>;
}
