import { ProjectStatus } from 'prisma/src/generated/prisma-client/client';
export declare class CreateProjectDto {
    name: string;
    description?: string;
    officeId: string;
    createdByUserId: string;
    projectManagerUserId: string;
    status?: ProjectStatus;
}
