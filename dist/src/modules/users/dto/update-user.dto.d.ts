import { CreateUserDto } from './create-user.dto';
import { UserStatus } from 'prisma/src/generated/prisma-client/client';
declare const UpdateUserDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateUserDto>>;
export declare class UpdateUserDto extends UpdateUserDto_base {
    fullName?: string;
    email?: string;
    phone?: string;
    username?: string;
    password?: string;
    roles?: string[];
    status?: UserStatus;
}
export {};
