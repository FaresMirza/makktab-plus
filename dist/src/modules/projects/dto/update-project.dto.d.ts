import { CreateProjectDto } from './create-project.dto';
import { ProjectStatus } from 'prisma/src/generated/prisma-client/client';
declare const UpdateProjectDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateProjectDto>>;
export declare class UpdateProjectDto extends UpdateProjectDto_base {
    name?: string;
    description?: string;
    projectManagerUserId?: string;
    status?: ProjectStatus;
}
export {};
