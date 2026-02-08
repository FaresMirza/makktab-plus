import { TaskStatus } from 'prisma/src/generated/prisma-client/client';
export declare class CreateTaskDto {
    title: string;
    description?: string;
    projectId: string;
    createdByUserId: string;
    assignedToUserId: string;
    status?: TaskStatus;
    dueDate?: string;
}
