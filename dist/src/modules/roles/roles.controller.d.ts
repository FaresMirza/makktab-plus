import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
export declare class RolesController {
    private readonly rolesService;
    constructor(rolesService: RolesService);
    create(createRoleDto: CreateRoleDto): Promise<{
        description: string | null;
        id: string;
        createdAt: Date;
        name: string;
        key: string;
        scope: string;
    }>;
    findAll(scope?: string): Promise<{
        description: string | null;
        id: string;
        createdAt: Date;
        name: string;
        key: string;
        scope: string;
    }[]>;
    findByKey(key: string): Promise<{
        description: string | null;
        id: string;
        createdAt: Date;
        name: string;
        key: string;
        scope: string;
    }>;
    findOne(id: string): Promise<{
        description: string | null;
        id: string;
        createdAt: Date;
        name: string;
        key: string;
        scope: string;
    }>;
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
