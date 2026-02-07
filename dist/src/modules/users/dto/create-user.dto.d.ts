import { UserStatus } from 'prisma/src/generated/prisma-client/client';
export declare class CreateUserDto {
    fullName: string;
    email: string;
    phone: string;
    username: string;
    password: string;
    roles?: string[];
    status?: UserStatus;
    officeId?: string;
}
