import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { promises as fs } from 'fs';
import { join } from 'path';
import { ProjectFilesRepository } from './queries/project-files.queries';
import { ProjectsRepository } from '../projects/queries/projects.queries';
import { UsersRepository } from '../users/queries/users.queries';
import { JwtUser, TenantHelper } from '../../common/helpers/tenant.helper';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProjectFilesService {
  private readonly logger = new Logger(ProjectFilesService.name);

  constructor(
    private readonly projectFilesRepository: ProjectFilesRepository,
    private readonly projectsRepository: ProjectsRepository,
    private readonly usersRepository: UsersRepository,
    private readonly tenantHelper: TenantHelper,
    private readonly prisma: PrismaService,
  ) {}

  /**
   * Resolve the authenticated user's officeId.
   * Mirrors the pattern used in ProjectsService for tenant isolation.
   */
  private async getUserOfficeId(userPublicId: string): Promise<number> {
    const user = await this.usersRepository.findByPublicId(userPublicId);

    if (!user) {
      throw new NotFoundException(`User with ID ${userPublicId} not found`);
    }

    if (user.ownedOffice) {
      return user.ownedOffice.id;
    }
    if (user.offices && user.offices.length > 0) {
      return user.offices[0].id;
    }

    throw new ForbiddenException('User does not belong to any office');
  }

  /**
   * Verify that the project belongs to the user's office before any file operation.
   */
  private async verifyProjectAccess(projectPublicId: string, userOfficeId: number) {
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
   * Upload a file to a project (tenant-isolated).
   * Multer has already written the file to disk; we persist a metadata record.
   */
  async uploadFile(
    projectPublicId: string,
    userPublicId: string,
    file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    try {
      console.log(`[POST /projects/:id/files] Uploading file for user ${userPublicId} to project ${projectPublicId}`);

      const userOfficeId = await this.getUserOfficeId(userPublicId);
      const project = await this.verifyProjectAccess(projectPublicId, userOfficeId);

      const user = await this.usersRepository.findByPublicId(userPublicId);
      if (!user) {
        throw new NotFoundException(`User with ID ${userPublicId} not found`);
      }

      // Only office owner / manager / project manager / platform admin can upload.
      await this.tenantHelper.assertCanManageProject(
        { userId: userPublicId, username: user.username, roles: user.roles } as JwtUser,
        { officeId: project.officeId, projectManagerUserId: project.projectManagerUserId },
      );

      const originalName = Buffer.from(file.originalname, 'latin1').toString('utf8');
      const fileUrl = `/uploads/projects/${file.filename}`;

      const record = await this.projectFilesRepository.create({
        projectId: project.id,
        uploadedByUserId: user.id,
        fileName: originalName,
        storedFileName: file.filename,
        fileUrl,
        filePath: file.path,
        fileSize: file.size,
        mimeType: file.mimetype,
      });

      console.log(`[POST /projects/:id/files] ✓ File uploaded: ${record.publicId} (${file.size} bytes)`);

      return {
        publicId: record.publicId,
        fileName: record.fileName,
        fileUrl: record.fileUrl,
        fileSize: record.fileSize,
        mimeType: record.mimeType,
        createdAt: record.createdAt,
        uploadedBy: record.uploadedBy,
      };
    } catch (error) {
      // If DB write fails after Multer wrote the file, clean up the orphaned file.
      if (file?.path) {
        await fs.unlink(file.path).catch(() => undefined);
      }

      console.error(`[POST /projects/:id/files] Error uploading file:`, error);
      this.logger.error(`Error uploading file to project ${projectPublicId}:`, error);

      if (
        error instanceof NotFoundException ||
        error instanceof ForbiddenException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }

      throw new InternalServerErrorException(
        `Failed to upload file: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
    }
  }

  /**
   * List all files for a project (tenant-isolated).
   */
  async listFiles(projectPublicId: string, userPublicId: string) {
    const userOfficeId = await this.getUserOfficeId(userPublicId);
    const project = await this.verifyProjectAccess(projectPublicId, userOfficeId);

    const files = await this.projectFilesRepository.findByProjectId(project.id);

    return files.map((f) => ({
      publicId: f.publicId,
      fileName: f.fileName,
      fileUrl: f.fileUrl,
      fileSize: f.fileSize,
      mimeType: f.mimeType,
      createdAt: f.createdAt,
      uploadedBy: f.uploadedBy,
    }));
  }

  /**
   * Delete a file from a project (tenant-isolated).
   */
  /**
   * Upload a file attached to a specific task. Allowed if the caller is
   * the task's assignee, or has manage rights on the parent project.
   */
  async uploadTaskFile(
    taskPublicId: string,
    userPublicId: string,
    file: Express.Multer.File,
  ) {
    if (!file) throw new BadRequestException('No file provided');

    try {
      const task = await this.prisma.task.findUnique({
        where: { publicId: taskPublicId },
        select: {
          id: true,
          assignedToUserId: true,
          project: {
            select: { id: true, officeId: true, projectManagerUserId: true },
          },
        },
      });
      if (!task) throw new NotFoundException('Task not found');

      const user = await this.usersRepository.findByPublicId(userPublicId);
      if (!user) throw new NotFoundException('User not found');

      // Permission: assignee can upload to their own task; otherwise
      // require project-manager / office-owner / admin rights.
      const isAssignee = task.assignedToUserId === user.id;
      if (!isAssignee) {
        await this.tenantHelper.assertCanManageProject(
          { userId: userPublicId, username: user.username, roles: user.roles } as JwtUser,
          {
            officeId: task.project.officeId,
            projectManagerUserId: task.project.projectManagerUserId,
          },
        );
      }

      const originalName = Buffer.from(file.originalname, 'latin1').toString('utf8');
      const fileUrl = `/uploads/projects/${file.filename}`;

      const record = await this.projectFilesRepository.create({
        projectId: task.project.id,
        taskId: task.id,
        uploadedByUserId: user.id,
        fileName: originalName,
        storedFileName: file.filename,
        fileUrl,
        filePath: file.path,
        fileSize: file.size,
        mimeType: file.mimetype,
      });

      return {
        publicId: record.publicId,
        fileName: record.fileName,
        fileUrl: record.fileUrl,
        fileSize: record.fileSize,
        mimeType: record.mimeType,
        createdAt: record.createdAt,
        uploadedBy: record.uploadedBy,
      };
    } catch (error) {
      if (file?.path) {
        await fs.unlink(file.path).catch(() => undefined);
      }
      if (
        error instanceof NotFoundException ||
        error instanceof ForbiddenException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      this.logger.error(
        `Error uploading task file (task=${taskPublicId}):`,
        error,
      );
      throw new InternalServerErrorException(
        `Failed to upload task file: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
    }
  }

  /**
   * List files attached to a specific task. Visible to anyone in the
   * task's office (read-only).
   */
  async listTaskFiles(taskPublicId: string, userPublicId: string) {
    const task = await this.prisma.task.findUnique({
      where: { publicId: taskPublicId },
      select: { id: true, project: { select: { officeId: true } } },
    });
    if (!task) throw new NotFoundException('Task not found');

    const userOfficeId = await this.getUserOfficeId(userPublicId);
    if (task.project.officeId !== userOfficeId) {
      throw new ForbiddenException('You do not have access to this task');
    }

    const files = await this.projectFilesRepository.findByTaskId(task.id);
    return files.map((f) => ({
      publicId: f.publicId,
      fileName: f.fileName,
      fileUrl: f.fileUrl,
      fileSize: f.fileSize,
      mimeType: f.mimeType,
      createdAt: f.createdAt,
      uploadedBy: f.uploadedBy,
    }));
  }

  async deleteFile(filePublicId: string, userPublicId: string) {
    const userOfficeId = await this.getUserOfficeId(userPublicId);

    const file = await this.projectFilesRepository.findByPublicId(filePublicId);
    if (!file) {
      throw new NotFoundException(`File with ID ${filePublicId} not found`);
    }

    if (file.project.officeId !== userOfficeId) {
      throw new ForbiddenException('You do not have access to this file');
    }

    // Permission check: same as upload — only owner/manager/project manager.
    const user = await this.usersRepository.findByPublicId(userPublicId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userPublicId} not found`);
    }
    await this.tenantHelper.assertCanManageProject(
      { userId: userPublicId, username: user.username, roles: user.roles } as JwtUser,
      {
        officeId: file.project.officeId,
        projectManagerUserId: file.project.projectManagerUserId,
      },
    );

    await this.projectFilesRepository.delete(file.id);

    // Best-effort delete the actual file on disk
    const absolutePath = join(process.cwd(), 'uploads', 'projects', file.storedFileName);
    await fs.unlink(absolutePath).catch(() => undefined);

    return { message: 'File deleted', publicId: filePublicId };
  }
}
