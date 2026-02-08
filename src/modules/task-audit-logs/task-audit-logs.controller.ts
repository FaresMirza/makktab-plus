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
import { TaskAuditLogsService } from './task-audit-logs.service';
import { CreateTaskAuditLogDto } from './dto/create-task-audit-log.dto';
import { TaskAction } from 'prisma/src/generated/prisma-client/client';

@Controller('task-audit-logs')
@UsePipes(new ValidationPipe({ 
  whitelist: true, 
  forbidNonWhitelisted: true,
  transform: true 
}))
export class TaskAuditLogsController {
  constructor(private readonly taskAuditLogsService: TaskAuditLogsService) {}

  /**
   * Create a new task audit log entry
   * POST /task-audit-logs
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createTaskAuditLogDto: CreateTaskAuditLogDto) {
    return this.taskAuditLogsService.create(createTaskAuditLogDto);
  }

  /**
   * Get all task audit logs with optional filters
   * GET /task-audit-logs?taskId=xxx&officeId=xxx&actorUserId=xxx&action=xxx
   */
  @Get()
  findAll(
    @Query('taskId') taskId?: string,
    @Query('officeId') officeId?: string,
    @Query('actorUserId') actorUserId?: string,
    @Query('action') action?: TaskAction,
  ) {
    if (taskId) {
      return this.taskAuditLogsService.findByTask(taskId);
    }
    if (officeId) {
      return this.taskAuditLogsService.findByOffice(officeId);
    }
    if (actorUserId) {
      return this.taskAuditLogsService.findByActor(actorUserId);
    }
    if (action) {
      return this.taskAuditLogsService.findByAction(action);
    }
    return this.taskAuditLogsService.findAll();
  }

  /**
   * Get a specific task audit log by ID
   * GET /task-audit-logs/:id
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskAuditLogsService.findOne(id);
  }

  /**
   * Delete a task audit log
   * DELETE /task-audit-logs/:id
   */
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(@Param('id') id: string) {
    return this.taskAuditLogsService.remove(id);
  }
}
