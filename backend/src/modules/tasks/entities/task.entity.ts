import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus } from 'prisma/src/generated/prisma-client/client';

export class Task {
  id: number;
  publicId: string;
  title: string;
  description: string;
  projectId: number;
  createdByUserId: number;
  assignedToUserId: number;
  status: TaskStatus;
  dueDate: Date;
  createdAt: Date;
}
