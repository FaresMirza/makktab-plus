import { ApiProperty } from '@nestjs/swagger';
import { ProjectAction } from 'prisma/src/generated/prisma-client/client';

export class ProjectAuditLog {
  id: string;
  officeId: string;
  projectId: string;
  actorUserId: string;
  action: ProjectAction;
  fieldName: string;
  oldValue: string;
  newValue: string;
  ip: string;
  deviceFingerprint: string;
  geo: string;
  createdAt: Date;
}
