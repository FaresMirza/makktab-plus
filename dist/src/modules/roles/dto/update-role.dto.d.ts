import { CreateRoleDto } from './create-role.dto';
declare const UpdateRoleDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateRoleDto>>;
export declare class UpdateRoleDto extends UpdateRoleDto_base {
    scope?: string;
    name?: string;
    description?: string;
}
export {};
