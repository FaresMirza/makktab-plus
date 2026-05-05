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
  UsePipes,
  UseGuards,
  Req,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskStatus } from 'prisma/src/generated/prisma-client/client';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { PaginationQueryDto } from '../../common/dto/pagination.dto';
import { JwtUser } from '../../common/helpers/tenant.helper';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
@UsePipes(new ValidationPipe({
  whitelist: true,
  forbidNonWhitelisted: true,
  transform: true,
}))
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createTaskDto: CreateTaskDto, @Req() req: any) {
    return this.tasksService.create(createTaskDto, req.user as JwtUser);
  }

  /**
   * Get tasks (paginated, tenant-scoped). All query filters AND-combine.
   * GET /tasks?projectId=&status=&assignedToUserId=&createdByUserId=&page=&limit=
   */
  @Get()
  findAll(
    @Req() req: any,
    @Query() paging: PaginationQueryDto,
    @Query('projectId') projectId?: string,
    @Query('status') status?: TaskStatus,
    @Query('assignedToUserId') assignedToUserId?: string,
    @Query('createdByUserId') createdByUserId?: string,
  ) {
    return this.tasksService.findFiltered(
      { projectId, status, assignedToUserId, createdByUserId },
      req.user as JwtUser,
      paging,
    );
  }

  @Get('overdue')
  findOverdue(@Req() req: any, @Query() paging: PaginationQueryDto) {
    return this.tasksService.findOverdue(req.user as JwtUser, paging);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: any) {
    return this.tasksService.findOne(id, req.user as JwtUser);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @Req() req: any,
  ) {
    return this.tasksService.update(id, updateTaskDto, req.user as JwtUser);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(@Param('id') id: string, @Req() req: any) {
    return this.tasksService.remove(id, req.user as JwtUser, false);
  }

  @Delete(':id/permanent')
  @HttpCode(HttpStatus.OK)
  removePermanent(@Param('id') id: string, @Req() req: any) {
    return this.tasksService.remove(id, req.user as JwtUser, true);
  }
}
