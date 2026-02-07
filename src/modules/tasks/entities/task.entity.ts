import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus } from 'prisma/src/generated/prisma-client/client';

export class Task {
  id: string;
  title: string;
  description: string;
  projectId: string;
  createdByUserId: string;
  assignedToUserId: string;
  status: TaskStatus;
  dueDate: Date;
  createdAt: Date;
}
