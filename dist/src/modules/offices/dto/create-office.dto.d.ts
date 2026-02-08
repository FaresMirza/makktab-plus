import { OfficeStatus } from 'prisma/src/generated/prisma-client/client';
export declare class CreateOfficeDto {
    name: string;
    ownerUserId: string;
    status?: OfficeStatus;
}
