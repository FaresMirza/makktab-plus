import { Module } from '@nestjs/common';
import { ProjectAuditLogsService } from './project-audit-logs.service';
import { ProjectAuditLogsHelper } from './helpers/project-audit-logs.helper';
import { ProjectAuditLogsRepository } from './queries/project-audit-logs.queries';
import { ProjectAuditLogsController } from './project-audit-logs.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ProjectAuditLogsController],
  providers: [ProjectAuditLogsService, ProjectAuditLogsHelper, ProjectAuditLogsRepository],
  exports: [ProjectAuditLogsService], // Export the service so it can be used in other modules
})
export class ProjectAuditLogsModule { }
