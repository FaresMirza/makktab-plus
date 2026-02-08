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
   * - Validates that project, creator, and assignee exist
   * - Sets default status to TODO if not provided
   */
  async create(createTaskDto: CreateTaskDto) {
    const { projectId, createdByUserId, assignedToUserId, title, description, status, dueDate } = createTaskDto;

    // Check if project exists
    await this.tasksHelper.validateProjectExists(projectId);

    // Check if creator user exists
    await this.tasksHelper.validateUserExists(createdByUserId, 'Creator');

    // Check if assignee user exists
    await this.tasksHelper.validateUserExists(assignedToUserId, 'Assignee');

    const task = await this.tasksRepository.create({
      title,
      description,
      projectId,
      createdByUserId,
      assignedToUserId,
      status: status || TaskStatus.TODO,
      dueDate: dueDate ? new Date(dueDate) : null,
    });

    return task;
  }

  /**
   * Get all tasks
   * - Includes project, creator, and assignee information
   */
  async findAll() {
    return this.tasksRepository.findAll();
  }

  /**
   * Get a specific task by ID
   * - Includes project, creator, and assignee information
   */
  async findOne(id: string) {
    const task = await this.tasksRepository.findById(id);

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return task;
  }

  /**
   * Get tasks by project
   * - Returns all tasks belonging to a specific project
   */
  async findByProject(projectId: string) {
    return this.tasksRepository.findByProject(projectId);
  }

  /**
   * Get tasks by status
   * - Returns all tasks with a specific status
   */
  async findByStatus(status: TaskStatus) {
    return this.tasksRepository.findByStatus(status);
  }

  /**
   * Get tasks assigned to a specific user
   * - Returns all tasks assigned to the user
   */
  async findByAssignee(assignedToUserId: string) {
    return this.tasksRepository.findByAssignee(assignedToUserId);
  }

  /**
   * Get tasks created by a specific user
   * - Returns all tasks created by the user
   */
  async findByCreator(createdByUserId: string) {
    return this.tasksRepository.findByCreator(createdByUserId);
  }

  /**
   * Get overdue tasks
   * - Returns all tasks with due date in the past and not done
   */
  async findOverdue() {
    return this.tasksRepository.findOverdue();
  }

  /**
   * Update a task
   * - Can update title, description, assignee, status, and due date
   * - Cannot update projectId or createdByUserId
   */
  async update(id: string, updateTaskDto: UpdateTaskDto) {
    // Check if task exists
    await this.tasksHelper.validateTaskExists(id);

    // If updating assignee, check if user exists
    if (updateTaskDto.assignedToUserId) {
      await this.tasksHelper.validateUserExists(updateTaskDto.assignedToUserId, 'Assignee');
    }

    // Prepare update data
    const updateData: any = { ...updateTaskDto };
    if (updateTaskDto.dueDate) {
      updateData.dueDate = new Date(updateTaskDto.dueDate);
    }

    const updatedTask = await this.tasksRepository.update(id, updateData);

    return updatedTask;
  }

  /**
   * Delete/Cancel a task
   * - Soft delete: Sets status to CANCELLED
   * - Hard delete: Permanently removes task (use with caution)
   */
  async remove(id: string, hardDelete = false) {
    // Check if task exists
    await this.tasksHelper.validateTaskExists(id);

    if (hardDelete) {
      // Hard delete - permanently remove task
      await this.tasksRepository.delete(id);
      return { message: 'Task permanently deleted' };
    } else {
      // Soft delete - cancel task
      return this.tasksRepository.softDelete(id);
    }
  }
}
