import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Param, 
  Delete,
  Query,
  HttpCode,
  HttpStatus,
  ValidationPipe,
  UsePipes
} from '@nestjs/common';
import { ProjectAuditLogsService } from './project-audit-logs.service';
import { CreateProjectAuditLogDto } from './dto/create-project-audit-log.dto';
import { ProjectAction } from 'prisma/src/generated/prisma-client/client';

@Controller('project-audit-logs')
@UsePipes(new ValidationPipe({ 
  whitelist: true, 
  forbidNonWhitelisted: true,
  transform: true 
}))
export class ProjectAuditLogsController {
  constructor(private readonly projectAuditLogsService: ProjectAuditLogsService) {}

  /**
   * Create a new project audit log entry
   * POST /project-audit-logs
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createProjectAuditLogDto: CreateProjectAuditLogDto) {
    return this.projectAuditLogsService.create(createProjectAuditLogDto);
  }

  /**
   * Get all project audit logs with optional filters
   * GET /project-audit-logs?projectId=xxx&officeId=xxx&actorUserId=xxx&action=xxx
   */
  @Get()
  findAll(
    @Query('projectId') projectId?: string,
    @Query('officeId') officeId?: string,
    @Query('actorUserId') actorUserId?: string,
    @Query('action') action?: ProjectAction,
  ) {
    if (projectId) {
      return this.projectAuditLogsService.findByProject(projectId);
    }
    if (officeId) {
      return this.projectAuditLogsService.findByOffice(officeId);
    }
    if (actorUserId) {
      return this.projectAuditLogsService.findByActor(actorUserId);
    }
    if (action) {
      return this.projectAuditLogsService.findByAction(action);
    }
    return this.projectAuditLogsService.findAll();
  }

  /**
   * Get a specific project audit log by ID
   * GET /project-audit-logs/:id
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectAuditLogsService.findOne(id);
  }

  /**
   * Delete a project audit log
   * DELETE /project-audit-logs/:id
   */
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(@Param('id') id: string) {
    return this.projectAuditLogsService.remove(id);
  }
}
