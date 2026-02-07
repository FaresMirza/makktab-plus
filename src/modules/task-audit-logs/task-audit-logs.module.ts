import { Module } from '@nestjs/common';
import { TaskAuditLogsService } from './task-audit-logs.service';
import { TaskAuditLogsController } from './task-audit-logs.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TaskAuditLogsController],
  providers: [TaskAuditLogsService],
  exports: [TaskAuditLogsService], // Export the service so it can be used in other modules
})
export class TaskAuditLogsModule {}
