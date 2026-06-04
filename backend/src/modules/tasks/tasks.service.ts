import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
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

  private normalizeTaskTimeline(
    project: { startDate: Date | null; endDate: Date | null },
    startAt?: string | Date | null,
    endAt?: string | Date | null,
  ) {
    if (!project.startDate || !project.endDate) {
      throw new BadRequestException('Project timeline must be set before adding task dates.');
    }
    if (!startAt || !endAt) {
      throw new BadRequestException('Task start and end times are required.');
    }

    const parsedStart = new Date(startAt);
    const parsedEnd = new Date(endAt);
    if (Number.isNaN(parsedStart.getTime()) || Number.isNaN(parsedEnd.getTime())) {
      throw new BadRequestException('Task dates are invalid.');
    }
    if (parsedStart >= parsedEnd) {
      throw new BadRequestException('Task end time must be after the start time.');
    }

    const projectStart = new Date(project.startDate);
    projectStart.setHours(0, 0, 0, 0);

    const projectEnd = new Date(project.endDate);
    projectEnd.setHours(23, 59, 59, 999);

    if (parsedStart < projectStart || parsedEnd > projectEnd) {
      throw new BadRequestException('Task dates must stay within the parent project timeline.');
    }

    return {
      startAt: parsedStart,
      endAt: parsedEnd,
      dueDate: parsedEnd,
    };
  }

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
    const { projectId, createdByUserId, assignedToUserId, title, description, status, dueDate, startAt, endAt } = createTaskDto;

    const project = await this.tasksHelper.validateProjectExists(projectId);
    const creator = await this.tasksHelper.validateUserExists(createdByUserId, 'Creator');
    const assignee = await this.tasksHelper.validateUserExists(assignedToUserId, 'Assignee');

    // Only platform admins, the office owner/manager, or the project's
    // assigned manager may create tasks in the project.
    await this.tenantHelper.assertCanManageProject(user, {
      officeId: project.officeId,
      projectManagerUserId: project.projectManagerUserId,
    });

    const timeline = this.normalizeTaskTimeline(project, startAt, endAt);

    return this.tasksRepository.create({
      title,
      description,
      projectId: project.id,
      createdByUserId: creator.id,
      assignedToUserId: assignee.id,
      status: status || TaskStatus.TODO,
      startAt: timeline.startAt,
      endAt: timeline.endAt,
      dueDate: dueDate ? new Date(dueDate) : timeline.dueDate,
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
   *
   * Visibility rules layered on top of explicit filters:
   *  - platform admin / office owner / office manager: see all tasks in
   *    the office (only the office filter applies).
   *  - everyone else (employee / project-manager-only): tasks where they
   *    are assignee OR they manage the parent project. The query AND-s
   *    that with whatever explicit filters the caller passed.
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
      restrictToUserId?: number;
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

    // Visibility: non-admin/non-owner/non-manager users only see tasks
    // they're assigned to OR projects they manage.
    const me = await this.prisma.user.findUnique({
      where: { publicId: user.userId },
      select: {
        id: true,
        ownedOffice: { select: { id: true } },
      },
    });
    const isPlatformAdmin = this.tenantHelper.isPlatformAdmin(user);
    const isOfficeOwner =
      !!officeId && !!me?.ownedOffice && me.ownedOffice.id === officeId;
    const isOfficeManager =
      !!officeId && (user.roles?.includes('manager') ?? false);
    const isOfficeAdmin = isPlatformAdmin || isOfficeOwner || isOfficeManager;
    if (!isOfficeAdmin && me) {
      resolved.restrictToUserId = me.id;
    }

    const { skip, take } = pagingArgs(paging);
    const [rows, total] = await this.tasksRepository.findFilteredPaginated(resolved, skip, take);
    console.log(
      `[GET /tasks] caller=${user.userId} (${user.username}) ` +
      `isAdmin=${isOfficeAdmin} ` +
      `filters=${JSON.stringify({ ...filters, resolved })} ` +
      `total=${total} returned=${rows.length}`,
    );
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
    if (updateTaskDto.status !== undefined) {
      updateData.status = updateTaskDto.status;
      // Stamp/clear completedAt on the status transition so the project
      // report can show "when did the assignee finish this".
      updateData.completedAt = updateTaskDto.status === TaskStatus.DONE ? new Date() : null;
    }
    if (
      updateTaskDto.startAt !== undefined ||
      updateTaskDto.endAt !== undefined ||
      updateTaskDto.dueDate !== undefined
    ) {
      const currentTask = await this.tasksRepository.findById(task.id);
      if (!currentTask) {
        throw new NotFoundException('Task not found');
      }

      const timeline = this.normalizeTaskTimeline(
        currentTask.project,
        updateTaskDto.startAt ?? currentTask.startAt,
        updateTaskDto.endAt ?? currentTask.endAt,
      );

      updateData.startAt = timeline.startAt;
      updateData.endAt = timeline.endAt;
      updateData.dueDate = updateTaskDto.dueDate
        ? new Date(updateTaskDto.dueDate)
        : timeline.dueDate;
    }

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
