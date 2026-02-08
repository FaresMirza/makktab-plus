import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectAuditLogDto } from './dto/create-project-audit-log.dto';
import { ProjectAction } from 'prisma/src/generated/prisma-client/client';
import { ProjectAuditLogsHelper } from './helpers/project-audit-logs.helper';
import { ProjectAuditLogsRepository } from './queries/project-audit-logs.queries';

@Injectable()
export class ProjectAuditLogsService {
  constructor(
    private readonly projectAuditLogsHelper: ProjectAuditLogsHelper,
    private readonly projectAuditLogsRepository: ProjectAuditLogsRepository,
  ) { }

  /**
   * Create a new project audit log entry
   * - Records changes made to projects
   * - Tracks who made the change, what changed, and when
   * - Used for compliance and tracking
   */
  async create(createProjectAuditLogDto: CreateProjectAuditLogDto) {
    const { officeId, projectId, actorUserId, action, ...rest } = createProjectAuditLogDto;

    // Validate office exists
    await this.projectAuditLogsHelper.validateOfficeExists(officeId);

    // Validate project exists
    await this.projectAuditLogsHelper.validateProjectExists(projectId);

    // Validate actor user exists
    await this.projectAuditLogsHelper.validateUserExists(actorUserId);

    const auditLog = await this.projectAuditLogsRepository.create({
      officeId,
      projectId,
      actorUserId,
      action,
      fieldName: rest.fieldName,
      oldValue: rest.oldValue,
      newValue: rest.newValue,
      ip: rest.ip,
      deviceFingerprint: rest.deviceFingerprint,
      geo: rest.geo,
    });

    return auditLog;
  }

  /**
   * Get all project audit logs
   * - Returns all audit log records
   */
  async findAll() {
    return this.projectAuditLogsRepository.findAll();
  }

  /**
   * Get a specific audit log by ID
   * - Returns audit log details
   */
  async findOne(id: string) {
    const auditLog = await this.projectAuditLogsRepository.findById(id);

    if (!auditLog) {
      throw new NotFoundException(`Project audit log with ID ${id} not found`);
    }

    return auditLog;
  }

  /**
   * Get audit logs by project
   * - Returns all audit logs for a specific project
   */
  async findByProject(projectId: string) {
    return this.projectAuditLogsRepository.findByProject(projectId);
  }

  /**
   * Get audit logs by office
   * - Returns all audit logs for a specific office
   */
  async findByOffice(officeId: string) {
    return this.projectAuditLogsRepository.findByOffice(officeId);
  }

  /**
   * Get audit logs by actor (user who made changes)
   * - Returns all audit logs for actions performed by a specific user
   */
  async findByActor(actorUserId: string) {
    return this.projectAuditLogsRepository.findByActor(actorUserId);
  }

  /**
   * Get audit logs by action
   * - Returns all audit logs for a specific action type
   */
  async findByAction(action: ProjectAction) {
    return this.projectAuditLogsRepository.findByAction(action);
  }

  /**
   * Delete an audit log
   * - Permanently removes the audit log record
   * - Use with extreme caution as this affects compliance
   */
  async remove(id: string) {
    // Check if audit log exists
    await this.projectAuditLogsHelper.validateLogExists(id);

    await this.projectAuditLogsRepository.delete(id);

    return { message: 'Project audit log deleted successfully' };
  }
}
