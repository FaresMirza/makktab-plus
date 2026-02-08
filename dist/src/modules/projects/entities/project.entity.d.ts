import { ProjectStatus } from 'prisma/src/generated/prisma-client/client';
export declare class Project {
    id: string;
    name: string;
    description: string;
    officeId: string;
    createdByUserId: string;
    projectManagerUserId: string;
    status: ProjectStatus;
    createdAt: Date;
}
