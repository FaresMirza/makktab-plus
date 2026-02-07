import { ApiProperty } from '@nestjs/swagger';
import { TaskAction } from 'prisma/src/generated/prisma-client/client';

export class TaskAuditLog {
  id: string;
  officeId: string;
  taskId: string;
  actorUserId: string;
  action: TaskAction;
  fieldName: string;
  oldValue: string;
  newValue: string;
  ip: string;
  deviceFingerprint: string;
  geo: string;
  createdAt: Date;
}
