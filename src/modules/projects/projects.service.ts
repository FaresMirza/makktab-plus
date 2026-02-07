import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectStatus } from 'prisma/src/generated/prisma-client/client';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Create a new project
   * - Validates that office, creator, and project manager exist
   * - Sets default status to IN_PROGRESS if not provided
   */
  async create(createProjectDto: CreateProjectDto) {
    const { officeId, createdByUserId, projectManagerUserId, name, description, status } = createProjectDto;

    // Check if office exists
    const office = await this.prisma.office.findUnique({
      where: { id: officeId },
    });

    if (!office) {
      throw new NotFoundException(`Office with ID ${officeId} not found`);
    }

    // Check if creator user exists
    const creator = await this.prisma.user.findUnique({
      where: { id: createdByUserId },
    });

    if (!creator) {
      throw new NotFoundException(`Creator user with ID ${createdByUserId} not found`);
    }

    // Check if project manager exists
    const projectManager = await this.prisma.user.findUnique({
      where: { id: projectManagerUserId },
    });

    if (!projectManager) {
      throw new NotFoundException(`Project manager with ID ${projectManagerUserId} not found`);
    }

    const project = await this.prisma.project.create({
      data: {
        name,
        description,
        officeId,
        createdByUserId,
        projectManagerUserId,
        status: status || ProjectStatus.IN_PROGRESS,
      },
      include: {
        office: {
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
        projectManager: {
          select: {
            id: true,
            fullName: true,
            email: true,
            username: true,
          },
        },
      },
    });

    return project;
  }

  /**
   * Get all projects
   * - Includes office, creator, project manager information
   * - Includes task count
   */
  async findAll() {
    const projects = await this.prisma.project.findMany({
      include: {
        office: {
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
        projectManager: {
          select: {
            id: true,
            fullName: true,
            email: true,
            username: true,
          },
        },
        _count: {
          select: {
            tasks: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return projects;
  }

  /**
   * Get a specific project by ID
   * - Includes office, creator, project manager information
   * - Includes list of tasks
   */
  async findOne(id: string) {
    const project = await this.prisma.project.findUnique({
      where: { id },
      include: {
        office: {
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
        projectManager: {
          select: {
            id: true,
            fullName: true,
            email: true,
            username: true,
          },
        },
        tasks: {
          select: {
            id: true,
            title: true,
            description: true,
            status: true,
            dueDate: true,
            createdAt: true,
            assignedTo: {
              select: {
                id: true,
                fullName: true,
                email: true,
              },
            },
          },
        },
      },
    });

    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    return project;
  }

  /**
   * Get projects by office
   * - Returns all projects belonging to a specific office
   */
  async findByOffice(officeId: string) {
    const projects = await this.prisma.project.findMany({
      where: { officeId },
      include: {
        createdBy: {
          select: {
            id: true,
            fullName: true,
            email: true,
            username: true,
          },
        },
        projectManager: {
          select: {
            id: true,
            fullName: true,
            email: true,
            username: true,
          },
        },
        _count: {
          select: {
            tasks: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return projects;
  }

  /**
   * Get projects by status
   * - Returns all projects with a specific status
   */
  async findByStatus(status: ProjectStatus) {
    const projects = await this.prisma.project.findMany({
      where: { status },
      include: {
        office: {
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
        projectManager: {
          select: {
            id: true,
            fullName: true,
            email: true,
            username: true,
          },
        },
        _count: {
          select: {
            tasks: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return projects;
  }

  /**
   * Get projects managed by a specific user
   * - Returns all projects where the user is the project manager
   */
  async findByProjectManager(projectManagerUserId: string) {
    const projects = await this.prisma.project.findMany({
      where: { projectManagerUserId },
      include: {
        office: {
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
        _count: {
          select: {
            tasks: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return projects;
  }

  /**
   * Update a project
   * - Can update name, description, project manager, and status
   * - Cannot update officeId or createdByUserId
   */
  async update(id: string, updateProjectDto: UpdateProjectDto) {
    // Check if project exists
    const existingProject = await this.prisma.project.findUnique({
      where: { id },
    });

    if (!existingProject) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    // If updating project manager, check if user exists
    if (updateProjectDto.projectManagerUserId) {
      const projectManager = await this.prisma.user.findUnique({
        where: { id: updateProjectDto.projectManagerUserId },
      });

      if (!projectManager) {
        throw new NotFoundException(
          `Project manager with ID ${updateProjectDto.projectManagerUserId} not found`,
        );
      }
    }

    const updatedProject = await this.prisma.project.update({
      where: { id },
      data: updateProjectDto,
      include: {
        office: {
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
        projectManager: {
          select: {
            id: true,
            fullName: true,
            email: true,
            username: true,
          },
        },
        _count: {
          select: {
            tasks: true,
          },
        },
      },
    });

    return updatedProject;
  }

  /**
   * Delete/Cancel a project
   * - Soft delete: Sets status to CANCELLED
   * - Hard delete: Permanently removes project (use with caution)
   */
  async remove(id: string, hardDelete = false) {
    // Check if project exists
    const project = await this.prisma.project.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            tasks: true,
          },
        },
      },
    });

    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    if (hardDelete) {
      // Check if project has related records
      if (project._count.tasks > 0) {
        throw new ConflictException(
          'Cannot permanently delete project with existing tasks. Please remove them first.',
        );
      }

      // Hard delete - permanently remove project
      await this.prisma.project.delete({
        where: { id },
      });
      return { message: 'Project permanently deleted' };
    } else {
      // Soft delete - cancel project
      const cancelledProject = await this.prisma.project.update({
        where: { id },
        data: { status: ProjectStatus.CANCELLED },
        include: {
          office: {
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
          projectManager: {
            select: {
              id: true,
              fullName: true,
              email: true,
            },
          },
        },
      });
      return cancelledProject;
    }
  }

  /**
   * Get project statistics
   * - Returns counts of tasks by status and other metrics
   */
  async getStatistics(id: string) {
    const project = await this.prisma.project.findUnique({
      where: { id },
      include: {
        tasks: {
          select: {
            status: true,
          },
        },
      },
    });

    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    const tasksByStatus = project.tasks.reduce(
      (acc, task) => {
        acc[task.status] = (acc[task.status] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    return {
      projectId: project.id,
      projectName: project.name,
      status: project.status,
      statistics: {
        totalTasks: project.tasks.length,
        tasksByStatus,
      },
    };
  }
}
