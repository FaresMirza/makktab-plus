import { Injectable, NotFoundException, ForbiddenException, Logger, InternalServerErrorException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectStatus } from 'prisma/src/generated/prisma-client/client';
import { ProjectsHelper } from './helpers/projects.helper';
import { ProjectsRepository } from './queries/projects.queries';
import { UsersRepository } from '../users/queries/users.queries';

@Injectable()
export class ProjectsService {
  private readonly logger = new Logger(ProjectsService.name);

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
    try {
      this.logger.debug(`Creating project for user: ${userPublicId}`);
      console.log(`[POST /projects] Creating project for user: ${userPublicId}`);

      // Step 1: Get user's office ID
      console.log(`[POST /projects] Step 1: Getting user office ID for ${userPublicId}`);
      const userOfficeId = await this.getUserOfficeId(userPublicId);
      console.log(`[POST /projects] Step 1: User office ID = ${userOfficeId}`);

      // Step 2: Get user details (for createdByUserId)
      console.log(`[POST /projects] Step 2: Fetching user details for ${userPublicId}`);
      const user = await this.usersRepository.findByPublicId(userPublicId);

      if (!user) {
        console.error(`[POST /projects] User not found: ${userPublicId}`);
        throw new NotFoundException(`User with ID ${userPublicId} not found`);
      }
      console.log(`[POST /projects] Step 2: User found - ID = ${user.id}, OfficeId = ${userOfficeId}`);

      const { projectManagerUserId, name, description, status, budget, startDate, endDate, clientId } = createProjectDto;

      // Step 3: Validate project manager exists
      console.log(`[POST /projects] Step 3: Validating project manager: ${projectManagerUserId}`);
      const projectManager = await this.projectsHelper.validateUserExists(projectManagerUserId, 'Project manager');
      console.log(`[POST /projects] Step 3: Project manager found - ID = ${projectManager.id}`);

      // Step 4: Validate client exists if provided
      let clientObj: any = null;
      if (clientId) {
        console.log(`[POST /projects] Step 4: Validating client: ${clientId}`);
        clientObj = await this.projectsHelper.validateUserExists(clientId, 'Client');
        console.log(`[POST /projects] Step 4: Client found - ID = ${clientObj.id}`);
      }

      // Step 5: Create project in database
      console.log(`[POST /projects] Step 5: Creating project in database`);
      console.log(`[POST /projects] Project data:`, {
        name,
        description,
        officeId: userOfficeId,
        createdByUserId: user.id,
        projectManagerUserId: projectManager.id,
        clientId: clientObj?.id || null,
        status: status || ProjectStatus.IN_PROGRESS,
        budget,
        startDate,
        endDate,
      });

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

      console.log(`[POST /projects] Project created successfully: ${project.publicId}`);
      this.logger.debug(`Project created successfully: ${project.publicId}`);
      return project;
    } catch (error) {
      console.error(`[POST /projects] Error creating project for user ${userPublicId}:`, error);
      this.logger.error(`Error creating project for user ${userPublicId}:`, error);

      if (error instanceof NotFoundException || error instanceof ForbiddenException) {
        throw error;
      }

      throw new InternalServerErrorException(
        `Failed to create project: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
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
    try {
      console.log(`[getUserOfficeId] Getting office ID for user: ${userPublicId}`);
      this.logger.debug(`Getting office ID for user: ${userPublicId}`);

      const user = await this.usersRepository.findByPublicId(userPublicId);

      if (!user) {
        console.error(`[getUserOfficeId] User not found: ${userPublicId}`);
        this.logger.error(`User not found: ${userPublicId}`);
        throw new NotFoundException(`User with ID ${userPublicId} not found`);
      }

      console.log(`[getUserOfficeId] User found:`, {
        id: user.id,
        publicId: user.publicId,
        username: user.username,
        hasOwnedOffice: !!user.ownedOffice,
        ownedOfficeId: user.ownedOffice?.id,
        officesCount: user.offices?.length || 0,
        officeIds: user.offices?.map(o => o.id),
      });

      let officeId: number;

      if (user.ownedOffice) {
        officeId = user.ownedOffice.id;
        console.log(`[getUserOfficeId] User is office owner, office ID: ${officeId}`);
        this.logger.debug(`User is office owner, office ID: ${officeId}`);
      } else if (user.offices && user.offices.length > 0) {
        officeId = user.offices[0].id;
        console.log(`[getUserOfficeId] User belongs to office, office ID: ${officeId}`);
        this.logger.debug(`User belongs to office, office ID: ${officeId}`);
      } else {
        console.error(`[getUserOfficeId] User ${userPublicId} does not belong to any office`);
        this.logger.error(`User ${userPublicId} does not belong to any office`);
        throw new ForbiddenException('User does not belong to any office');
      }

      console.log(`[getUserOfficeId] Returning office ID: ${officeId}`);
      return officeId;
    } catch (error) {
      console.error(`[getUserOfficeId] Error getting office ID for user ${userPublicId}:`, error);
      this.logger.error(`Error getting office ID for user ${userPublicId}:`, error);
      throw error;
    }
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
    try {
      this.logger.debug(`Fetching projects for user: ${userPublicId}`);
      console.log(`[GET /projects] Fetching projects for user: ${userPublicId}, filters: status=${status}, projectManager=${projectManagerUserId}`);

      // Step 1: Get user's office ID
      console.log(`[GET /projects] Step 1: Getting user office ID`);
      const userOfficeId = await this.getUserOfficeId(userPublicId);
      console.log(`[GET /projects] Step 1: User office ID = ${userOfficeId}`);

      // Step 2: Query projects based on filters
      console.log(`[GET /projects] Step 2: Querying projects from database`);

      if (status) {
        console.log(`[GET /projects] Filtering by status: ${status}`);
        const projects = await this.projectsRepository.findByOfficeAndStatus(userOfficeId, status);
        console.log(`[GET /projects] Found ${projects.length} projects with status ${status}`);
        return projects;
      }

      if (projectManagerUserId) {
        console.log(`[GET /projects] Filtering by project manager: ${projectManagerUserId}`);
        const projectManager = await this.projectsHelper.validateUserExists(
          projectManagerUserId,
          'Project manager',
        );
        console.log(`[GET /projects] Project manager ID: ${projectManager.id}`);
        const projects = await this.projectsRepository.findByOfficeAndProjectManager(
          userOfficeId,
          projectManager.id,
        );
        console.log(`[GET /projects] Found ${projects.length} projects managed by ${projectManager.id}`);
        return projects;
      }

      console.log(`[GET /projects] Fetching all projects for office ${userOfficeId}`);
      const projects = await this.projectsRepository.findByOffice(userOfficeId);
      console.log(`[GET /projects] Found ${projects.length} total projects`);
      return projects;
    } catch (error) {
      console.error(`[GET /projects] Error fetching projects for user ${userPublicId}:`, error);
      this.logger.error(`Error fetching projects for user ${userPublicId}:`, error);

      if (error instanceof NotFoundException || error instanceof ForbiddenException) {
        throw error;
      }

      throw new InternalServerErrorException(
        `Failed to fetch projects: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Get a specific project for authenticated user (with tenant isolation)
   */
  async findOneForAuthenticatedUser(projectPublicId: string, userPublicId: string) {
    try {
      const userOfficeId = await this.getUserOfficeId(userPublicId);
      await this.verifyProjectAccess(projectPublicId, userOfficeId);

      const project = await this.projectsRepository.findByPublicId(projectPublicId);

      if (!project) {
        throw new NotFoundException(`Project with ID ${projectPublicId} not found`);
      }

      return project;
    } catch (error) {
      this.logger.error(`Error fetching project ${projectPublicId} for user ${userPublicId}:`, error);
      throw error;
    }
  }

  /**
   * Update a project (with tenant isolation)
   */
  async updateForAuthenticatedUser(
    projectPublicId: string,
    updateProjectDto: UpdateProjectDto,
    userPublicId: string,
  ) {
    try {
      this.logger.debug(`Updating project ${projectPublicId} for user ${userPublicId}`);

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

      this.logger.debug(`Project ${projectPublicId} updated successfully`);
      return updatedProject;
    } catch (error) {
      this.logger.error(`Error updating project ${projectPublicId} for user ${userPublicId}:`, error);
      throw error;
    }
  }

  /**
   * Delete/Cancel a project (with tenant isolation)
   */
  async removeForAuthenticatedUser(
    projectPublicId: string,
    userPublicId: string,
    hardDelete = false,
  ) {
    try {
      this.logger.debug(`Removing project ${projectPublicId} for user ${userPublicId}, hardDelete=${hardDelete}`);

      const userOfficeId = await this.getUserOfficeId(userPublicId);
      const project = await this.verifyProjectAccess(projectPublicId, userOfficeId);

      const projectWithCount = await this.projectsRepository.findByIdWithTaskCount(project.id);
      if (!projectWithCount) {
        throw new NotFoundException(`Project with ID ${projectPublicId} not found`);
      }

      if (hardDelete) {
        this.projectsHelper.validateDeleteCondition(projectWithCount);
        await this.projectsRepository.delete(project.id);
        this.logger.debug(`Project ${projectPublicId} permanently deleted`);
        return { message: 'Project permanently deleted' };
      } else {
        const result = await this.projectsRepository.softDelete(project.id);
        this.logger.debug(`Project ${projectPublicId} soft deleted`);
        return result;
      }
    } catch (error) {
      this.logger.error(`Error removing project ${projectPublicId} for user ${userPublicId}:`, error);
      throw error;
    }
  }

  /**
   * Get project statistics for authenticated user (with tenant isolation)
   */
  async getStatisticsForAuthenticatedUser(projectPublicId: string, userPublicId: string) {
    try {
      const userOfficeId = await this.getUserOfficeId(userPublicId);
      await this.verifyProjectAccess(projectPublicId, userOfficeId);

      const project = await this.projectsRepository.findByPublicIdWithTasksStatus(projectPublicId);

      if (!project) {
        throw new NotFoundException(`Project with ID ${projectPublicId} not found`);
      }

      return this.projectsHelper.formatStatistics(project);
    } catch (error) {
      this.logger.error(`Error getting statistics for project ${projectPublicId} for user ${userPublicId}:`, error);
      throw error;
    }
  }
}
