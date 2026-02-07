import { ApiProperty } from '@nestjs/swagger';
import { TaskAction } from 'prisma/src/generated/prisma-client/client';

export class TaskAuditLog {
  @ApiProperty({ description: 'The unique identifier of the audit log' })
  id: string;

  @ApiProperty({ description: 'The ID of the office' })
  officeId: string;

  @ApiProperty({ description: 'The ID of the task' })
  taskId: string;

  @ApiProperty({ description: 'The ID of the user who performed the action' })
  actorUserId: string;

  @ApiProperty({ description: 'The action performed', enum: TaskAction })
  action: TaskAction;

  @ApiProperty({ description: 'The name of the field that was changed' })
  fieldName: string;

  @ApiProperty({ description: 'The old value before the change' })
  oldValue: string;

  @ApiProperty({ description: 'The new value after the change' })
  newValue: string;

  @ApiProperty({ description: 'IP address of the request' })
  ip: string;

  @ApiProperty({ description: 'Device fingerprint' })
  deviceFingerprint: string;

  @ApiProperty({ description: 'Geographic location' })
  geo: string;

  @ApiProperty({ description: 'The creation date of the audit log' })
  createdAt: Date;
}
