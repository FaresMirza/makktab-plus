import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskStatus } from 'prisma/src/generated/prisma-client/client';
import { TasksHelper } from './helpers/tasks.helper';
import { TasksRepository } from './queries/tasks.queries';
import { JwtUser, TenantHelper } from '../../common/helpers/tenant.helper';
import {
  PaginationQueryDto,
  makePaginated,
  pagingArgs,
} from '../../common/dto/pagination.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(
    private readonly tasksHelper: TasksHelper,
    private readonly tasksRepository: TasksRepository,
    private readonly tenantHelper: TenantHelper,
    private readonly prisma: PrismaService,
  ) { }

  /**
   * Verify a task's project lives in the caller's office (admins bypass).
   */
  private async assertTaskInScope(taskInternalId: number, user: JwtUser) {
    if (this.tenantHelper.isPlatformAdmin(user)) return;
    const task = await this.prisma.task.findUnique({
      where: { id: taskInternalId },
      select: { project: { select: { officeId: true } } },
    });
    if (!task) throw new NotFoundException('Task not found');
    const myOfficeId = await this.tenantHelper.resolveOfficeId(user);
    if (task.project.officeId !== myOfficeId) {
      throw new ForbiddenException('Task is in a different office');
    }
  }

  /**
   * Look up the parent project's tenancy fields for a given task.
   * Used by the management-permission check.
   */
  private async getProjectForTask(taskInternalId: number) {
    const task = await this.prisma.task.findUnique({
      where: { id: taskInternalId },
      select: {
        assignedToUserId: true,
        project: { select: { officeId: true, projectManagerUserId: true } },
      },
    });
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  async create(createTaskDto: CreateTaskDto, user: JwtUser) {
    const { projectId, createdByUserId, assignedToUserId, title, description, status, dueDate } = createTaskDto;

    const project = await this.tasksHelper.validateProjectExists(projectId);
    const creator = await this.tasksHelper.validateUserExists(createdByUserId, 'Creator');
    const assignee = await this.tasksHelper.validateUserExists(assignedToUserId, 'Assignee');

    // Only platform admins, the office owner/manager, or the project's
    // assigned manager may create tasks in the project.
    await this.tenantHelper.assertCanManageProject(user, {
      officeId: project.officeId,
      projectManagerUserId: project.projectManagerUserId,
    });

    return this.tasksRepository.create({
      title,
      description,
      projectId: project.id,
      createdByUserId: creator.id,
      assignedToUserId: assignee.id,
      status: status || TaskStatus.TODO,
      dueDate: dueDate ? new Date(dueDate) : null,
    });
  }

  /**
   * List tasks paginated and tenant-scoped.
   */
  async findAll(user: JwtUser, paging?: PaginationQueryDto) {
    return this.findFiltered({}, user, paging);
  }

  async findOne(publicId: string, user: JwtUser) {
    const task = await this.tasksRepository.findByPublicId(publicId);
    if (!task) throw new NotFoundException(`Task with ID ${publicId} not found`);
    await this.assertTaskInScope(task.id, user);
    return task;
  }

  /**
   * AND-combined filtered list, tenant scoped, paginated.
   */
  async findFiltered(
    filters: {
      projectId?: string;
      status?: TaskStatus;
      assignedToUserId?: string;
      createdByUserId?: string;
    },
    user: JwtUser,
    paging?: PaginationQueryDto,
  ) {
    const resolved: {
      projectId?: number;
      status?: TaskStatus;
      assignedToUserId?: number;
      createdByUserId?: number;
      officeId?: number;
    } = {};

    if (filters.projectId) {
      const project = await this.tasksHelper.validateProjectExists(filters.projectId);
      resolved.projectId = project.id;
    }
    if (filters.status) resolved.status = filters.status;
    if (filters.assignedToUserId) {
      const u = await this.tasksHelper.validateUserExists(filters.assignedToUserId, 'Assignee');
      resolved.assignedToUserId = u.id;
    }
    if (filters.createdByUserId) {
      const u = await this.tasksHelper.validateUserExists(filters.createdByUserId, 'Creator');
      resolved.createdByUserId = u.id;
    }

    const officeId = await this.tenantHelper.tryResolveOfficeId(user);
    if (officeId !== null) {
      resolved.officeId = officeId;
    }

    const { skip, take } = pagingArgs(paging);
    const [rows, total] = await this.tasksRepository.findFilteredPaginated(resolved, skip, take);
    // TEMP DEBUG — remove once /tasks fetch issue is solved
    console.log(`[GET /tasks] caller=${user.userId} (${user.username}) filters=${JSON.stringify({ ...filters, resolved })} total=${total} returned=${rows.length}`);
    return makePaginated(rows, total, paging);
  }

  async findOverdue(user: JwtUser, paging?: PaginationQueryDto) {
    const officeId = await this.tenantHelper.tryResolveOfficeId(user);
    const { skip, take } = pagingArgs(paging);
    const [rows, total] = await this.tasksRepository.findOverduePaginated(officeId, skip, take);
    return makePaginated(rows, total, paging);
  }

  async update(publicId: string, updateTaskDto: UpdateTaskDto, user: JwtUser) {
    const task = await this.tasksHelper.validateTaskExists(publicId);
    const taskCtx = await this.getProjectForTask(task.id);

    // Decide whether the caller is allowed:
    //   - manageable by them (owner / manager / project manager / admin), OR
    //   - they're the assignee AND the only field they're touching is `status`.
    const fields = Object.keys(updateTaskDto).filter(
      (k) => (updateTaskDto as any)[k] !== undefined,
    );
    const onlyStatusChange = fields.length === 1 && fields[0] === 'status';

    if (onlyStatusChange) {
      // Must be the assignee OR have manage rights.
      const userRecord = await this.prisma.user.findUnique({
        where: { publicId: user.userId },
        select: { id: true },
      });
      const isAssignee =
        !!userRecord && taskCtx.assignedToUserId === userRecord.id;
      if (!isAssignee) {
        await this.tenantHelper.assertCanManageProject(user, taskCtx.project);
      }
    } else {
      await this.tenantHelper.assertCanManageProject(user, taskCtx.project);
    }

    const updateData: any = {};
    if (updateTaskDto.title !== undefined) updateData.title = updateTaskDto.title;
    if (updateTaskDto.description !== undefined) updateData.description = updateTaskDto.description;
    if (updateTaskDto.status !== undefined) updateData.status = updateTaskDto.status;
    if (updateTaskDto.dueDate) updateData.dueDate = new Date(updateTaskDto.dueDate);

    if (updateTaskDto.assignedToUserId) {
      const assignee = await this.tasksHelper.validateUserExists(updateTaskDto.assignedToUserId, 'Assignee');
      updateData.assignedToUserId = assignee.id;
    }

    return this.tasksRepository.update(task.id, updateData);
  }

  async remove(publicId: string, user: JwtUser, hardDelete = false) {
    const task = await this.tasksHelper.validateTaskExists(publicId);
    const taskCtx = await this.getProjectForTask(task.id);
    await this.tenantHelper.assertCanManageProject(user, taskCtx.project);

    if (hardDelete) {
      await this.tasksRepository.delete(task.id);
      return { message: 'Task permanently deleted' };
    }
    return this.tasksRepository.softDelete(task.id);
  }
}
