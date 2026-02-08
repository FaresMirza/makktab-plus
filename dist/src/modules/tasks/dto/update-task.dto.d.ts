import { CreateTaskDto } from './create-task.dto';
import { TaskStatus } from 'prisma/src/generated/prisma-client/client';
declare const UpdateTaskDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateTaskDto>>;
export declare class UpdateTaskDto extends UpdateTaskDto_base {
    title?: string;
    description?: string;
    assignedToUserId?: string;
    status?: TaskStatus;
    dueDate?: string;
}
export {};
