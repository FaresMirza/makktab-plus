import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectAuditLogDto } from './dto/create-project-audit-log.dto';
import { ProjectAction } from 'prisma/src/generated/prisma-client/client';

@Injectable()
export class ProjectAuditLogsService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Create a new project audit log entry
   * - Records changes made to projects
   * - Tracks who made the change, what changed, and when
   * - Used for compliance and tracking
   */
  async create(createProjectAuditLogDto: CreateProjectAuditLogDto) {
    const { officeId, projectId, actorUserId, action, ...rest } = createProjectAuditLogDto;

    // Validate office exists
    const office = await this.prisma.office.findUnique({
      where: { id: officeId },
    });

    if (!office) {
      throw new NotFoundException(`Office with ID ${officeId} not found`);
    }

    // Validate project exists
    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      throw new NotFoundException(`Project with ID ${projectId} not found`);
    }

    // Validate actor user exists
    const actor = await this.prisma.user.findUnique({
      where: { id: actorUserId },
    });

    if (!actor) {
      throw new NotFoundException(`Actor user with ID ${actorUserId} not found`);
    }

    const auditLog = await this.prisma.projectAuditLog.create({
      data: {
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
      },
      include: {
        office: {
          select: {
            id: true,
            name: true,
          },
        },
        project: {
          select: {
            id: true,
            name: true,
          },
        },
        actor: {
          select: {
            id: true,
            fullName: true,
            email: true,
            username: true,
          },
        },
      },
    });

    return auditLog;
  }

  /**
   * Get all project audit logs
   * - Returns all audit log records
   */
  async findAll() {
    const auditLogs = await this.prisma.projectAuditLog.findMany({
      include: {
        office: {
          select: {
            id: true,
            name: true,
          },
        },
        project: {
          select: {
            id: true,
            name: true,
          },
        },
        actor: {
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

    return auditLogs;
  }

  /**
   * Get a specific audit log by ID
   * - Returns audit log details
   */
  async findOne(id: string) {
    const auditLog = await this.prisma.projectAuditLog.findUnique({
      where: { id },
      include: {
        office: {
          select: {
            id: true,
            name: true,
          },
        },
        project: {
          select: {
            id: true,
            name: true,
          },
        },
        actor: {
          select: {
            id: true,
            fullName: true,
            email: true,
            username: true,
          },
        },
      },
    });

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
    const auditLogs = await this.prisma.projectAuditLog.findMany({
      where: { projectId },
      include: {
        office: {
          select: {
            id: true,
            name: true,
          },
        },
        actor: {
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

    return auditLogs;
  }

  /**
   * Get audit logs by office
   * - Returns all audit logs for a specific office
   */
  async findByOffice(officeId: string) {
    const auditLogs = await this.prisma.projectAuditLog.findMany({
      where: { officeId },
      include: {
        project: {
          select: {
            id: true,
            name: true,
          },
        },
        actor: {
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

    return auditLogs;
  }

  /**
   * Get audit logs by actor (user who made changes)
   * - Returns all audit logs for actions performed by a specific user
   */
  async findByActor(actorUserId: string) {
    const auditLogs = await this.prisma.projectAuditLog.findMany({
      where: { actorUserId },
      include: {
        office: {
          select: {
            id: true,
            name: true,
          },
        },
        project: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return auditLogs;
  }

  /**
   * Get audit logs by action
   * - Returns all audit logs for a specific action type
   */
  async findByAction(action: ProjectAction) {
    const auditLogs = await this.prisma.projectAuditLog.findMany({
      where: { action },
      include: {
        office: {
          select: {
            id: true,
            name: true,
          },
        },
        project: {
          select: {
            id: true,
            name: true,
          },
        },
        actor: {
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

    return auditLogs;
  }

  /**
   * Delete an audit log
   * - Permanently removes the audit log record
   * - Use with extreme caution as this affects compliance
   */
  async remove(id: string) {
    // Check if audit log exists
    const auditLog = await this.prisma.projectAuditLog.findUnique({
      where: { id },
    });

    if (!auditLog) {
      throw new NotFoundException(`Project audit log with ID ${id} not found`);
    }

    await this.prisma.projectAuditLog.delete({
      where: { id },
    });

    return { message: 'Project audit log deleted successfully' };
  }
}
