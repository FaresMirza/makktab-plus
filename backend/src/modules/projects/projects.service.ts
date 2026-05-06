import { Injectable, NotFoundException, ForbiddenException, Logger, InternalServerErrorException, ConflictException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectStatus } from 'prisma/src/generated/prisma-client/client';
import { ProjectsHelper } from './helpers/projects.helper';
import { ProjectsRepository } from './queries/projects.queries';
import { UsersRepository } from '../users/queries/users.queries';
import { PaginationQueryDto, makePaginated, pagingArgs } from '../../common/dto/pagination.dto';

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
    const { officeId, createdByUserId, projectManagerUserId, name, description, status, budget, startDate, endDate, clientName } = createProjectDto;

    // Resolve publicIds → internal entities
    const office = await this.projectsHelper.validateOfficeExists(officeId);
    const creator = await this.projectsHelper.validateUserExists(createdByUserId, 'Creator');
    const projectManager = await this.projectsHelper.validateUserExists(projectManagerUserId, 'Project manager');

    const project = await this.projectsRepository.create({
      name,
      description,
      budget: budget ? String(budget) : null,
      startDate: startDate ? new Date(startDate) : null,
      endDate: endDate ? new Date(endDate) : null,
      clientName: clientName || null,
      officeId: office.id,
      createdByUserId: creator.id,
      projectManagerUserId: projectManager.id,
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

      const { projectManagerUserId, name, description, status, budget, startDate, endDate, clientName } = createProjectDto;

      // Step 3: Validate project manager exists
      console.log(`[POST /projects] Step 3: Validating project manager: ${projectManagerUserId}`);
      const projectManager = await this.projectsHelper.validateUserExists(projectManagerUserId, 'Project manager');
      console.log(`[POST /projects] Step 3: Project manager found - ID = ${projectManager.id}`);

      // Step 3.5: Check for duplicate project name in office
      console.log(`[POST /projects] Step 3.5: Checking for duplicate project name in office ${userOfficeId}`);
      const existingProject = await this.projectsRepository.findByOfficeAndName(userOfficeId, name);
      if (existingProject) {
        console.log(`[POST /projects] Step 3.5: ✗ Duplicate project name found: ${name}`);
        throw new ConflictException('A project with this name already exists in your office.');
      }
      console.log(`[POST /projects] Step 3.5: ✓ No duplicate project name found`);

      // Step 4: Create project in database
      console.log(`[POST /projects] Step 4: Creating project in database`);
      console.log(`[POST /projects] Project data:`, {
        name,
        description,
        officeId: userOfficeId,
        createdByUserId: user.id,
        projectManagerUserId: projectManager.id,
        clientName: clientName || null,
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
        clientName: clientName || null,
        officeId: userOfficeId,
        createdByUserId: user.id,
        projectManagerUserId: projectManager.id,
        status: status || ProjectStatus.IN_PROGRESS,
      });

      console.log(`[POST /projects] Project created successfully: ${project.publicId}`);
      this.logger.debug(`Project created successfully: ${project.publicId}`);
      return project;
    } catch (error) {
      console.error(`[POST /projects] Error creating project for user ${userPublicId}:`, error);
      this.logger.error(`Error creating project for user ${userPublicId}:`, error);

      if (error instanceof NotFoundException || error instanceof ForbiddenException || error instanceof ConflictException) {
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
   * Verify that a project belongs to the user's office (CRITICAL TENANT ISOLATION)
   */
  private async verifyProjectAccess(projectPublicId: string, userOfficeId: number): Promise<any> {
    try {
      console.log(`[verifyProjectAccess] Checking access: project=${projectPublicId}, userOfficeId=${userOfficeId}`);

      const project = await this.projectsRepository.findByPublicIdSimple(projectPublicId);

      if (!project) {
        console.error(`[verifyProjectAccess] ✗ Project not found: ${projectPublicId}`);
        throw new NotFoundException(`Project with ID ${projectPublicId} not found`);
      }

      console.log(`[verifyProjectAccess] Project found - projectOfficeId=${project.officeId}`);

      if (project.officeId !== userOfficeId) {
        console.error(`[verifyProjectAccess] ✗ SECURITY VIOLATION: User from office ${userOfficeId} tried to access project from office ${project.officeId}`);
        throw new ForbiddenException('You do not have access to this project');
      }

      console.log(`[verifyProjectAccess] ✓ TENANT ISOLATION VERIFIED: Project belongs to user's office`);
      return project;
    } catch (error) {
      console.error(`[verifyProjectAccess] Error verifying access:`, error);
      throw error;
    }
  }

  /**
   * Get projects for the authenticated user's office.
   *
   * Visibility:
   *   - office owner / manager / platform admin: all projects in the office
   *   - everyone else: only projects where they are the assigned manager
   *     OR have at least one task assigned
   */
  async findAllForAuthenticatedUser(
    userPublicId: string,
    status?: ProjectStatus,
    projectManagerUserId?: string,
    paging?: PaginationQueryDto,
  ) {
    try {
      const userOfficeId = await this.getUserOfficeId(userPublicId);

      const me = await this.usersRepository.findByPublicId(userPublicId);
      if (!me) throw new NotFoundException('User not found');

      const filters: {
        status?: ProjectStatus;
        projectManagerUserId?: number;
        restrictToUserId?: number;
      } = {};
      if (status) filters.status = status;
      if (projectManagerUserId) {
        const pm = await this.projectsHelper.validateUserExists(projectManagerUserId, 'Project manager');
        filters.projectManagerUserId = pm.id;
      }

      const isPlatformAdmin =
        me.roles?.includes('admin') || me.roles?.includes('super_admin');
      const isOfficeOwner = !!me.ownedOffice && me.ownedOffice.id === userOfficeId;
      const isOfficeManager = me.roles?.includes('manager') ?? false;
      const isOfficeAdmin = isPlatformAdmin || isOfficeOwner || isOfficeManager;
      if (!isOfficeAdmin) {
        filters.restrictToUserId = me.id;
      }

      const { skip, take } = pagingArgs(paging);
      const [rows, total] = await this.projectsRepository.findByOfficeFilteredPaginated(
        userOfficeId,
        filters,
        skip,
        take,
      );
      console.log(
        `[GET /projects] caller=${userPublicId} (${me.username}) ` +
        `isAdmin=${isOfficeAdmin} restrictTo=${filters.restrictToUserId ?? 'none'} ` +
        `total=${total} returned=${rows.length}`,
      );
      return makePaginated(rows, total, paging);
    } catch (error) {
      this.logger.error(`Error fetching projects for user ${userPublicId}:`, error);
      if (error instanceof NotFoundException || error instanceof ForbiddenException) {
        throw error;
      }
      throw new InternalServerErrorException(
        `Failed to fetch projects: ${error instanceof Error ? error.message : 'Unknown error'}`,
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
  ) {
    try {

      // Step 1: Get user's office ID
      console.log(`[DELETE /projects/:id] Step 1: Getting user office ID`);
      const userOfficeId = await this.getUserOfficeId(userPublicId);
      console.log(`[DELETE /projects/:id] Step 1: User office ID = ${userOfficeId}`);

      const project = await this.verifyProjectAccess(projectPublicId, userOfficeId);

      // Cascade-delete every record that references this project before
      // dropping the project itself (Task FK is RESTRICT, audit logs too).
      await this.projectsRepository.deleteWithChildren(project.id);

      return {
        message: 'Project successfully deleted',
        publicId: projectPublicId,
        officeId: userOfficeId,
      };
    } catch (error) {
      console.error(`[DELETE /projects/:id] Error deleting project ${projectPublicId}:`, error);
      this.logger.error(`Error removing project ${projectPublicId} for user ${userPublicId}:`, error);

      if (error instanceof NotFoundException || error instanceof ForbiddenException) {
        throw error;
      }

      throw new InternalServerErrorException(
        `Failed to delete project: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
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
