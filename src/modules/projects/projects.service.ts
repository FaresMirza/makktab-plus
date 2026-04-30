import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectStatus } from 'prisma/src/generated/prisma-client/client';
import { ProjectsHelper } from './helpers/projects.helper';
import { ProjectsRepository } from './queries/projects.queries';
import { UsersRepository } from '../users/queries/users.queries';

@Injectable()
export class ProjectsService {
  constructor(
    private readonly projectsHelper: ProjectsHelper,
    private readonly projectsRepository: ProjectsRepository,
    private readonly usersRepository: UsersRepository,
  ) { }

  /**
   * Create a new project (for backward compatibility - accepts officeId in request)
   * - Validates that office, creator, and project manager exist (by publicId)
   * - Resolves publicIds → internal ids for DB creation
   * - Sets default status to IN_PROGRESS if not provided
   */
  async create(createProjectDto: any) {
    const { officeId, createdByUserId, projectManagerUserId, name, description, status, budget, startDate, endDate, clientId } = createProjectDto;

    // Resolve publicIds → internal entities
    const office = await this.projectsHelper.validateOfficeExists(officeId);
    const creator = await this.projectsHelper.validateUserExists(createdByUserId, 'Creator');
    const projectManager = await this.projectsHelper.validateUserExists(projectManagerUserId, 'Project manager');

    let clientObj: any = null;
    if (clientId) {
      clientObj = await this.projectsHelper.validateUserExists(clientId, 'Client');
    }

    const project = await this.projectsRepository.create({
      name,
      description,
      budget: budget ? String(budget) : null,
      startDate: startDate ? new Date(startDate) : null,
      endDate: endDate ? new Date(endDate) : null,
      officeId: office.id,
      createdByUserId: creator.id,
      projectManagerUserId: projectManager.id,
      clientId: clientObj?.id || null,
      status: status || ProjectStatus.IN_PROGRESS,
    });

    return project;
  }

  /**
   * Create a new project for authenticated user
   * CRITICAL: Extracts officeId and createdByUserId from JWT token
   * Frontend cannot override these values for security/tenant isolation
   */
  async createForAuthenticatedUser(createProjectDto: CreateProjectDto, userPublicId: string) {
    const userOfficeId = await this.getUserOfficeId(userPublicId);
    const user = await this.usersRepository.findByPublicId(userPublicId);

    if (!user) {
      throw new NotFoundException(`User with ID ${userPublicId} not found`);
    }

    const { projectManagerUserId, name, description, status, budget, startDate, endDate, clientId } = createProjectDto;

    // Validate project manager exists
    const projectManager = await this.projectsHelper.validateUserExists(projectManagerUserId, 'Project manager');

    // Validate client exists if provided
    let clientObj: any = null;
    if (clientId) {
      clientObj = await this.projectsHelper.validateUserExists(clientId, 'Client');
    }

    const project = await this.projectsRepository.create({
      name,
      description,
      budget: budget ? String(budget) : null,
      startDate: startDate ? new Date(startDate) : null,
      endDate: endDate ? new Date(endDate) : null,
      officeId: userOfficeId,
      createdByUserId: user.id,
      projectManagerUserId: projectManager.id,
      clientId: clientObj?.id || null,
      status: status || ProjectStatus.IN_PROGRESS,
    });

    return project;
  }

  /**
   * Get all projects
   */
  async findAll() {
    return this.projectsRepository.findAll();
  }

  /**
   * Get a specific project by publicId
   */
  async findOne(publicId: string) {
    const project = await this.projectsRepository.findByPublicId(publicId);

    if (!project) {
      throw new NotFoundException(`Project with ID ${publicId} not found`);
    }

    return project;
  }

  /**
   * Get projects by office (by office publicId)
   */
  async findByOffice(officePublicId: string) {
    const office = await this.projectsHelper.validateOfficeExists(officePublicId);
    return this.projectsRepository.findByOffice(office.id);
  }

  /**
   * Get projects by status
   */
  async findByStatus(status: ProjectStatus) {
    return this.projectsRepository.findByStatus(status);
  }

  /**
   * Get projects managed by a specific user (by user publicId)
   */
  async findByProjectManager(projectManagerPublicId: string) {
    const user = await this.projectsHelper.validateUserExists(projectManagerPublicId, 'Project manager');
    return this.projectsRepository.findByProjectManager(user.id);
  }

  /**
   * Update a project
   * - Accepts publicId
   * - Can update name, description, project manager, and status
   */
  async update(publicId: string, updateProjectDto: UpdateProjectDto) {
    // Resolve project publicId → internal entity
    const project = await this.projectsHelper.validateProjectExists(publicId);

    // Build update data with resolved FK ids
    const updateData: any = {};
    if (updateProjectDto.name !== undefined) updateData.name = updateProjectDto.name;
    if (updateProjectDto.description !== undefined) updateData.description = updateProjectDto.description;
    if (updateProjectDto.status !== undefined) updateData.status = updateProjectDto.status;

    // If updating project manager, resolve publicId → internal id
    if (updateProjectDto.projectManagerUserId) {
      const pm = await this.projectsHelper.validateUserExists(
        updateProjectDto.projectManagerUserId,
        'Project manager',
      );
      updateData.projectManagerUserId = pm.id;
    }

    const updatedProject = await this.projectsRepository.update(project.id, updateData);

    return updatedProject;
  }

  /**
   * Delete/Cancel a project
   * - Accepts publicId
   */
  async remove(publicId: string, hardDelete = false) {
    const projectEntity = await this.projectsHelper.validateProjectExists(publicId);

    const project = await this.projectsRepository.findByIdWithTaskCount(projectEntity.id);
    if (!project) {
      throw new NotFoundException(`Project with ID ${publicId} not found`);
    }

    if (hardDelete) {
      this.projectsHelper.validateDeleteCondition(project);
      await this.projectsRepository.delete(project.id);
      return { message: 'Project permanently deleted' };
    } else {
      return this.projectsRepository.softDelete(project.id);
    }
  }

  /**
   * Get project statistics
   * - Accepts publicId
   */
  async getStatistics(publicId: string) {
    const projectEntity = await this.projectsHelper.validateProjectExists(publicId);
    const project = await this.projectsRepository.findByPublicIdWithTasksStatus(publicId);

    if (!project) {
      throw new NotFoundException(`Project with ID ${publicId} not found`);
    }

    return this.projectsHelper.formatStatistics(project);
  }

  /**
   * Helper: Get user's officeId from their publicId
   */
  private async getUserOfficeId(userPublicId: string): Promise<number> {
    const user = await this.usersRepository.findByPublicId(userPublicId);

    if (!user) {
      throw new NotFoundException(`User with ID ${userPublicId} not found`);
    }

    let officeId: number;

    if (user.ownedOffice) {
      officeId = user.ownedOffice.id;
    } else if (user.offices && user.offices.length > 0) {
      officeId = user.offices[0].id;
    } else {
      throw new ForbiddenException('User does not belong to any office');
    }

    return officeId;
  }

  /**
   * Verify that a project belongs to the user's office
   */
  private async verifyProjectAccess(projectPublicId: string, userOfficeId: number): Promise<any> {
    const project = await this.projectsRepository.findByPublicIdSimple(projectPublicId);

    if (!project) {
      throw new NotFoundException(`Project with ID ${projectPublicId} not found`);
    }

    if (project.officeId !== userOfficeId) {
      throw new ForbiddenException('You do not have access to this project');
    }

    return project;
  }

  /**
   * Get all projects for the authenticated user's office with optional filters
   */
  async findAllForAuthenticatedUser(
    userPublicId: string,
    status?: ProjectStatus,
    projectManagerUserId?: string,
  ) {
    const userOfficeId = await this.getUserOfficeId(userPublicId);

    if (status) {
      return this.projectsRepository.findByOfficeAndStatus(userOfficeId, status);
    }

    if (projectManagerUserId) {
      const projectManager = await this.projectsHelper.validateUserExists(
        projectManagerUserId,
        'Project manager',
      );
      return this.projectsRepository.findByOfficeAndProjectManager(
        userOfficeId,
        projectManager.id,
      );
    }

    return this.projectsRepository.findByOffice(userOfficeId);
  }

  /**
   * Get a specific project for authenticated user (with tenant isolation)
   */
  async findOneForAuthenticatedUser(projectPublicId: string, userPublicId: string) {
    const userOfficeId = await this.getUserOfficeId(userPublicId);
    await this.verifyProjectAccess(projectPublicId, userOfficeId);

    const project = await this.projectsRepository.findByPublicId(projectPublicId);

    if (!project) {
      throw new NotFoundException(`Project with ID ${projectPublicId} not found`);
    }

    return project;
  }

  /**
   * Update a project (with tenant isolation)
   */
  async updateForAuthenticatedUser(
    projectPublicId: string,
    updateProjectDto: UpdateProjectDto,
    userPublicId: string,
  ) {
    const userOfficeId = await this.getUserOfficeId(userPublicId);
    const project = await this.verifyProjectAccess(projectPublicId, userOfficeId);

    const updateData: any = {};
    if (updateProjectDto.name !== undefined) updateData.name = updateProjectDto.name;
    if (updateProjectDto.description !== undefined) updateData.description = updateProjectDto.description;
    if (updateProjectDto.status !== undefined) updateData.status = updateProjectDto.status;

    if (updateProjectDto.projectManagerUserId) {
      const pm = await this.projectsHelper.validateUserExists(
        updateProjectDto.projectManagerUserId,
        'Project manager',
      );
      updateData.projectManagerUserId = pm.id;
    }

    const updatedProject = await this.projectsRepository.update(project.id, updateData);

    return updatedProject;
  }

  /**
   * Delete/Cancel a project (with tenant isolation)
   */
  async removeForAuthenticatedUser(
    projectPublicId: string,
    userPublicId: string,
    hardDelete = false,
  ) {
    const userOfficeId = await this.getUserOfficeId(userPublicId);
    const project = await this.verifyProjectAccess(projectPublicId, userOfficeId);

    const projectWithCount = await this.projectsRepository.findByIdWithTaskCount(project.id);
    if (!projectWithCount) {
      throw new NotFoundException(`Project with ID ${projectPublicId} not found`);
    }

    if (hardDelete) {
      this.projectsHelper.validateDeleteCondition(projectWithCount);
      await this.projectsRepository.delete(project.id);
      return { message: 'Project permanently deleted' };
    } else {
      return this.projectsRepository.softDelete(project.id);
    }
  }

  /**
   * Get project statistics for authenticated user (with tenant isolation)
   */
  async getStatisticsForAuthenticatedUser(projectPublicId: string, userPublicId: string) {
    const userOfficeId = await this.getUserOfficeId(userPublicId);
    await this.verifyProjectAccess(projectPublicId, userOfficeId);

    const project = await this.projectsRepository.findByPublicIdWithTasksStatus(projectPublicId);

    if (!project) {
      throw new NotFoundException(`Project with ID ${projectPublicId} not found`);
    }

    return this.projectsHelper.formatStatistics(project);
  }
}
