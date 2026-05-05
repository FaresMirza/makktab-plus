import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Param, 
  Patch, 
  Delete,
  Query,
  HttpCode,
  HttpStatus,
  ValidationPipe,
  UsePipes
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskStatus } from 'prisma/src/generated/prisma-client/client';

@Controller('tasks')
@UsePipes(new ValidationPipe({ 
  whitelist: true, 
  forbidNonWhitelisted: true,
  transform: true 
}))
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  /**
   * Create a new task
   * POST /tasks
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  /**
   * Get all tasks with optional filters
   * GET /tasks?projectId=xxx&status=xxx&assignedToUserId=xxx&createdByUserId=xxx
   */
  @Get()
  findAll(
    @Query('projectId') projectId?: string,
    @Query('status') status?: TaskStatus,
    @Query('assignedToUserId') assignedToUserId?: string,
    @Query('createdByUserId') createdByUserId?: string,
  ) {
    if (projectId) {
      return this.tasksService.findByProject(projectId);
    }
    if (status) {
      return this.tasksService.findByStatus(status);
    }
    if (assignedToUserId) {
      return this.tasksService.findByAssignee(assignedToUserId);
    }
    if (createdByUserId) {
      return this.tasksService.findByCreator(createdByUserId);
    }
    return this.tasksService.findAll();
  }

  /**
   * Get overdue tasks
   * GET /tasks/overdue
   */
  @Get('overdue')
  findOverdue() {
    return this.tasksService.findOverdue();
  }

  /**
   * Get a specific task by ID
   * GET /tasks/:id
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }

  /**
   * Update an existing task
   * PATCH /tasks/:id
   */
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(id, updateTaskDto);
  }

  /**
   * Soft delete a task (cancel)
   * DELETE /tasks/:id
   */
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(@Param('id') id: string) {
    return this.tasksService.remove(id, false);
  }

  /**
   * Hard delete a task (permanent)
   * DELETE /tasks/:id/permanent
   */
  @Delete(':id/permanent')
  @HttpCode(HttpStatus.OK)
  removePermanent(@Param('id') id: string) {
    return this.tasksService.remove(id, true);
  }
}
