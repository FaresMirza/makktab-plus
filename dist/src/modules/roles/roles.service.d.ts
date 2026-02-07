import { PrismaService } from '../prisma/prisma.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
export declare class RolesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createRoleDto: CreateRoleDto): Promise<{
        description: string | null;
        id: string;
        createdAt: Date;
        name: string;
        key: string;
        scope: string;
    }>;
    findAll(): Promise<{
        description: string | null;
        id: string;
        createdAt: Date;
        name: string;
        key: string;
        scope: string;
    }[]>;
    findOne(id: string): Promise<{
        description: string | null;
        id: string;
        createdAt: Date;
        name: string;
        key: string;
        scope: string;
    }>;
    findByKey(key: string): Promise<{
        description: string | null;
        id: string;
        createdAt: Date;
        name: string;
        key: string;
        scope: string;
    }>;
    findByScope(scope: string): Promise<{
        description: string | null;
        id: string;
        createdAt: Date;
        name: string;
        key: string;
        scope: string;
    }[]>;
    update(id: string, updateRoleDto: UpdateRoleDto): Promise<{
        description: string | null;
        id: string;
        createdAt: Date;
        name: string;
        key: string;
        scope: string;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
