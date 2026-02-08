import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserStatus } from 'prisma/src/generated/prisma-client/client';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
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
    findAll(officeId?: string, role?: string, status?: UserStatus): Promise<{
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
    changePassword(id: string, oldPassword: string, newPassword: string): Promise<{
        message: string;
    }>;
    remove(id: string): Promise<{
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
    removePermanent(id: string): Promise<{
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
}
