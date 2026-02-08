import { CreateOfficeDto } from './create-office.dto';
import { OfficeStatus } from 'prisma/src/generated/prisma-client/client';
declare const UpdateOfficeDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateOfficeDto>>;
export declare class UpdateOfficeDto extends UpdateOfficeDto_base {
    name?: string;
    status?: OfficeStatus;
}
export {};
