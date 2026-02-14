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
   * - Validates that office, creator, and project manager exist (by publicId)
   * - Resolves publicIds → internal ids for DB creation
   * - Sets default status to IN_PROGRESS if not provided
   */
  async create(createProjectDto: CreateProjectDto) {
    const { officeId, createdByUserId, projectManagerUserId, name, description, status } = createProjectDto;

    // Resolve publicIds → internal entities
    const office = await this.projectsHelper.validateOfficeExists(officeId);
    const creator = await this.projectsHelper.validateUserExists(createdByUserId, 'Creator');
    const projectManager = await this.projectsHelper.validateUserExists(projectManagerUserId, 'Project manager');

    const project = await this.projectsRepository.create({
      name,
      description,
      officeId: office.id,
      createdByUserId: creator.id,
      projectManagerUserId: projectManager.id,
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
}
