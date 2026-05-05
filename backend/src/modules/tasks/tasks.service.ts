import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskStatus } from 'prisma/src/generated/prisma-client/client';
import { TasksHelper } from './helpers/tasks.helper';
import { TasksRepository } from './queries/tasks.queries';

@Injectable()
export class TasksService {
  constructor(
    private readonly tasksHelper: TasksHelper,
    private readonly tasksRepository: TasksRepository,
  ) { }

  /**
   * Create a new task
   * - Validates that project, creator, and assignee exist (by publicId)
   * - Resolves publicIds → internal ids for DB creation
   * - Sets default status to TODO if not provided
   */
  async create(createTaskDto: CreateTaskDto) {
    const { projectId, createdByUserId, assignedToUserId, title, description, status, dueDate } = createTaskDto;

    // Resolve publicIds → internal entities
    const project = await this.tasksHelper.validateProjectExists(projectId);
    const creator = await this.tasksHelper.validateUserExists(createdByUserId, 'Creator');
    const assignee = await this.tasksHelper.validateUserExists(assignedToUserId, 'Assignee');

    const task = await this.tasksRepository.create({
      title,
      description,
      projectId: project.id,
      createdByUserId: creator.id,
      assignedToUserId: assignee.id,
      status: status || TaskStatus.TODO,
      dueDate: dueDate ? new Date(dueDate) : null,
    });

    return task;
  }

  /**
   * Get all tasks
   */
  async findAll() {
    return this.tasksRepository.findAll();
  }

  /**
   * Get a specific task by publicId
   */
  async findOne(publicId: string) {
    const task = await this.tasksRepository.findByPublicId(publicId);

    if (!task) {
      throw new NotFoundException(`Task with ID ${publicId} not found`);
    }

    return task;
  }

  /**
   * Get tasks by project (by project publicId)
   */
  async findByProject(projectPublicId: string) {
    const project = await this.tasksHelper.validateProjectExists(projectPublicId);
    return this.tasksRepository.findByProject(project.id);
  }

  /**
   * Get tasks by status
   */
  async findByStatus(status: TaskStatus) {
    return this.tasksRepository.findByStatus(status);
  }

  /**
   * Get tasks assigned to a specific user (by user publicId)
   */
  async findByAssignee(assigneePublicId: string) {
    const user = await this.tasksHelper.validateUserExists(assigneePublicId, 'Assignee');
    return this.tasksRepository.findByAssignee(user.id);
  }

  /**
   * Get tasks created by a specific user (by user publicId)
   */
  async findByCreator(creatorPublicId: string) {
    const user = await this.tasksHelper.validateUserExists(creatorPublicId, 'Creator');
    return this.tasksRepository.findByCreator(user.id);
  }

  /**
   * Get overdue tasks
   */
  async findOverdue() {
    return this.tasksRepository.findOverdue();
  }

  /**
   * Update a task
   * - Accepts publicId
   * - Can update title, description, assignee, status, and due date
   */
  async update(publicId: string, updateTaskDto: UpdateTaskDto) {
    // Resolve task publicId → internal entity
    const task = await this.tasksHelper.validateTaskExists(publicId);

    // Build update data
    const updateData: any = {};
    if (updateTaskDto.title !== undefined) updateData.title = updateTaskDto.title;
    if (updateTaskDto.description !== undefined) updateData.description = updateTaskDto.description;
    if (updateTaskDto.status !== undefined) updateData.status = updateTaskDto.status;
    if (updateTaskDto.dueDate) updateData.dueDate = new Date(updateTaskDto.dueDate);

    // If updating assignee, resolve publicId → internal id
    if (updateTaskDto.assignedToUserId) {
      const assignee = await this.tasksHelper.validateUserExists(updateTaskDto.assignedToUserId, 'Assignee');
      updateData.assignedToUserId = assignee.id;
    }

    const updatedTask = await this.tasksRepository.update(task.id, updateData);

    return updatedTask;
  }

  /**
   * Delete/Cancel a task
   * - Accepts publicId
   */
  async remove(publicId: string, hardDelete = false) {
    const task = await this.tasksHelper.validateTaskExists(publicId);

    if (hardDelete) {
      await this.tasksRepository.delete(task.id);
      return { message: 'Task permanently deleted' };
    } else {
      return this.tasksRepository.softDelete(task.id);
    }
  }
}
