import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskStatus } from 'prisma/src/generated/prisma-client/client';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Create a new task
   * - Validates that project, creator, and assignee exist
   * - Sets default status to TODO if not provided
   */
  async create(createTaskDto: CreateTaskDto) {
    const { projectId, createdByUserId, assignedToUserId, title, description, status, dueDate } = createTaskDto;

    // Check if project exists
    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      throw new NotFoundException(`Project with ID ${projectId} not found`);
    }

    // Check if creator user exists
    const creator = await this.prisma.user.findUnique({
      where: { id: createdByUserId },
    });

    if (!creator) {
      throw new NotFoundException(`Creator user with ID ${createdByUserId} not found`);
    }

    // Check if assignee user exists
    const assignee = await this.prisma.user.findUnique({
      where: { id: assignedToUserId },
    });

    if (!assignee) {
      throw new NotFoundException(`Assignee user with ID ${assignedToUserId} not found`);
    }

    const task = await this.prisma.task.create({
      data: {
        title,
        description,
        projectId,
        createdByUserId,
        assignedToUserId,
        status: status || TaskStatus.TODO,
        dueDate: dueDate ? new Date(dueDate) : null,
      },
      include: {
        project: {
          select: {
            id: true,
            name: true,
            status: true,
          },
        },
        createdBy: {
          select: {
            id: true,
            fullName: true,
            email: true,
            username: true,
          },
        },
        assignedTo: {
          select: {
            id: true,
            fullName: true,
            email: true,
            username: true,
          },
        },
      },
    });

    return task;
  }

  /**
   * Get all tasks
   * - Includes project, creator, and assignee information
   */
  async findAll() {
    const tasks = await this.prisma.task.findMany({
      include: {
        project: {
          select: {
            id: true,
            name: true,
            status: true,
            office: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        createdBy: {
          select: {
            id: true,
            fullName: true,
            email: true,
            username: true,
          },
        },
        assignedTo: {
          select: {
            id: true,
            fullName: true,
            email: true,
            username: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return tasks;
  }

  /**
   * Get a specific task by ID
   * - Includes project, creator, and assignee information
   */
  async findOne(id: string) {
    const task = await this.prisma.task.findUnique({
      where: { id },
      include: {
        project: {
          select: {
            id: true,
            name: true,
            description: true,
            status: true,
            office: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        createdBy: {
          select: {
            id: true,
            fullName: true,
            email: true,
            username: true,
          },
        },
        assignedTo: {
          select: {
            id: true,
            fullName: true,
            email: true,
            username: true,
            status: true,
          },
        },
      },
    });

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
    const tasks = await this.prisma.task.findMany({
      where: { projectId },
      include: {
        createdBy: {
          select: {
            id: true,
            fullName: true,
            email: true,
            username: true,
          },
        },
        assignedTo: {
          select: {
            id: true,
            fullName: true,
            email: true,
            username: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return tasks;
  }

  /**
   * Get tasks by status
   * - Returns all tasks with a specific status
   */
  async findByStatus(status: TaskStatus) {
    const tasks = await this.prisma.task.findMany({
      where: { status },
      include: {
        project: {
          select: {
            id: true,
            name: true,
            status: true,
          },
        },
        createdBy: {
          select: {
            id: true,
            fullName: true,
            email: true,
            username: true,
          },
        },
        assignedTo: {
          select: {
            id: true,
            fullName: true,
            email: true,
            username: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return tasks;
  }

  /**
   * Get tasks assigned to a specific user
   * - Returns all tasks assigned to the user
   */
  async findByAssignee(assignedToUserId: string) {
    const tasks = await this.prisma.task.findMany({
      where: { assignedToUserId },
      include: {
        project: {
          select: {
            id: true,
            name: true,
            status: true,
            office: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        createdBy: {
          select: {
            id: true,
            fullName: true,
            email: true,
            username: true,
          },
        },
      },
      orderBy: {
        dueDate: 'asc',
      },
    });

    return tasks;
  }

  /**
   * Get tasks created by a specific user
   * - Returns all tasks created by the user
   */
  async findByCreator(createdByUserId: string) {
    const tasks = await this.prisma.task.findMany({
      where: { createdByUserId },
      include: {
        project: {
          select: {
            id: true,
            name: true,
            status: true,
          },
        },
        assignedTo: {
          select: {
            id: true,
            fullName: true,
            email: true,
            username: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return tasks;
  }

  /**
   * Get overdue tasks
   * - Returns all tasks with due date in the past and not done
   */
  async findOverdue() {
    const tasks = await this.prisma.task.findMany({
      where: {
        dueDate: {
          lt: new Date(),
        },
        status: {
          not: TaskStatus.DONE,
        },
      },
      include: {
        project: {
          select: {
            id: true,
            name: true,
            status: true,
          },
        },
        createdBy: {
          select: {
            id: true,
            fullName: true,
            email: true,
          },
        },
        assignedTo: {
          select: {
            id: true,
            fullName: true,
            email: true,
          },
        },
      },
      orderBy: {
        dueDate: 'asc',
      },
    });

    return tasks;
  }

  /**
   * Update a task
   * - Can update title, description, assignee, status, and due date
   * - Cannot update projectId or createdByUserId
   */
  async update(id: string, updateTaskDto: UpdateTaskDto) {
    // Check if task exists
    const existingTask = await this.prisma.task.findUnique({
      where: { id },
    });

    if (!existingTask) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    // If updating assignee, check if user exists
    if (updateTaskDto.assignedToUserId) {
      const assignee = await this.prisma.user.findUnique({
        where: { id: updateTaskDto.assignedToUserId },
      });

      if (!assignee) {
        throw new NotFoundException(
          `Assignee user with ID ${updateTaskDto.assignedToUserId} not found`,
        );
      }
    }

    // Prepare update data
    const updateData: any = { ...updateTaskDto };
    if (updateTaskDto.dueDate) {
      updateData.dueDate = new Date(updateTaskDto.dueDate);
    }

    const updatedTask = await this.prisma.task.update({
      where: { id },
      data: updateData,
      include: {
        project: {
          select: {
            id: true,
            name: true,
            status: true,
          },
        },
        createdBy: {
          select: {
            id: true,
            fullName: true,
            email: true,
            username: true,
          },
        },
        assignedTo: {
          select: {
            id: true,
            fullName: true,
            email: true,
            username: true,
          },
        },
      },
    });

    return updatedTask;
  }

  /**
   * Delete/Cancel a task
   * - Soft delete: Sets status to CANCELLED
   * - Hard delete: Permanently removes task (use with caution)
   */
  async remove(id: string, hardDelete = false) {
    // Check if task exists
    const task = await this.prisma.task.findUnique({
      where: { id },
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    if (hardDelete) {
      // Hard delete - permanently remove task
      await this.prisma.task.delete({
        where: { id },
      });
      return { message: 'Task permanently deleted' };
    } else {
      // Soft delete - cancel task
      const cancelledTask = await this.prisma.task.update({
        where: { id },
        data: { status: TaskStatus.CANCELLED },
        include: {
          project: {
            select: {
              id: true,
              name: true,
            },
          },
          createdBy: {
            select: {
              id: true,
              fullName: true,
              email: true,
            },
          },
          assignedTo: {
            select: {
              id: true,
              fullName: true,
              email: true,
            },
          },
        },
      });
      return cancelledTask;
    }
  }
}
