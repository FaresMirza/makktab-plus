import { ApiProperty } from '@nestjs/swagger';
import { ProjectStatus } from 'prisma/src/generated/prisma-client/client';

export class Project {
  id: number;
  publicId: string;
  name: string;
  description: string;
  officeId: number;
  createdByUserId: number;
  projectManagerUserId: number;
  status: ProjectStatus;
  createdAt: Date;
}
