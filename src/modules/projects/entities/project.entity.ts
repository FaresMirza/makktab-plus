import { ApiProperty } from '@nestjs/swagger';
import { ProjectStatus } from 'prisma/src/generated/prisma-client/client';

export class Project {
  id: string;
  name: string;
  description: string;
  officeId: string;
  createdByUserId: string;
  projectManagerUserId: string;
  status: ProjectStatus;
  createdAt: Date;
}
