import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectStatus } from 'prisma/src/generated/prisma-client/client';
import { ProjectsHelper } from './helpers/projects.helper';
import { ProjectsRepository } from './queries/projects.queries';

@Injectable()
export class ProjectsService {
  constructor(
    private readonly projectsHelper: ProjectsHelper,
    private readonly projectsRepository: ProjectsRepository,
  ) { }

  /**
   * Create a new project
   * - Validates that office, creator, and project manager exist
   * - Sets default status to IN_PROGRESS if not provided
   */
  async create(createProjectDto: CreateProjectDto) {
    const { officeId, createdByUserId, projectManagerUserId, name, description, status } = createProjectDto;

    // Check if office exists
    await this.projectsHelper.validateOfficeExists(officeId);

    // Check if creator user exists
    await this.projectsHelper.validateUserExists(createdByUserId, 'Creator');

    // Check if project manager exists
    await this.projectsHelper.validateUserExists(projectManagerUserId, 'Project manager');

    const project = await this.projectsRepository.create({
      name,
      description,
      officeId,
      createdByUserId,
      projectManagerUserId,
      status: status || ProjectStatus.IN_PROGRESS,
    });

    return project;
  }

  /**
   * Get all projects
   * - Includes office, creator, project manager information
   * - Includes task count
   */
  async findAll() {
    return this.projectsRepository.findAll();
  }

  /**
   * Get a specific project by ID
   * - Includes office, creator, project manager information
   * - Includes list of tasks
   */
  async findOne(id: string) {
    const project = await this.projectsRepository.findById(id);

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
    return this.projectsRepository.findByOffice(officeId);
  }

  /**
   * Get projects by status
   * - Returns all projects with a specific status
   */
  async findByStatus(status: ProjectStatus) {
    return this.projectsRepository.findByStatus(status);
  }

  /**
   * Get projects managed by a specific user
   * - Returns all projects where the user is the project manager
   */
  async findByProjectManager(projectManagerUserId: string) {
    return this.projectsRepository.findByProjectManager(projectManagerUserId);
  }

  /**
   * Update a project
   * - Can update name, description, project manager, and status
   * - Cannot update officeId or createdByUserId
   */
  async update(id: string, updateProjectDto: UpdateProjectDto) {
    // Check if project exists
    await this.projectsHelper.validateProjectExists(id);

    // If updating project manager, check if user exists
    if (updateProjectDto.projectManagerUserId) {
      await this.projectsHelper.validateUserExists(
        updateProjectDto.projectManagerUserId,
        'Project manager',
      );
    }

    const updatedProject = await this.projectsRepository.update(id, updateProjectDto);

    return updatedProject;
  }

  /**
   * Delete/Cancel a project
   * - Soft delete: Sets status to CANCELLED
   * - Hard delete: Permanently removes project (use with caution)
   */
  async remove(id: string, hardDelete = false) {
    // Check if project exists
    const project = await this.projectsRepository.findByIdWithTaskCount(id);

    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    if (hardDelete) {
      // Check if project has related records
      this.projectsHelper.validateDeleteCondition(project);

      // Hard delete - permanently remove project
      await this.projectsRepository.delete(id);
      return { message: 'Project permanently deleted' };
    } else {
      // Soft delete - cancel project
      return this.projectsRepository.softDelete(id);
    }
  }

  /**
   * Get project statistics
   * - Returns counts of tasks by status and other metrics
   */
  async getStatistics(id: string) {
    const project = await this.projectsRepository.findByIdWithTasksStatus(id);

    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    return this.projectsHelper.formatStatistics(project);
  }
}
