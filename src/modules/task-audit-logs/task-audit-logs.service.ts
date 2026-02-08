import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskAuditLogDto } from './dto/create-task-audit-log.dto';
import { TaskAction } from 'prisma/src/generated/prisma-client/client';

@Injectable()
export class TaskAuditLogsService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Create a new task audit log entry
   * - Records changes made to tasks
   * - Tracks who made the change, what changed, and when
   * - Used for compliance and tracking
   */
  async create(createTaskAuditLogDto: CreateTaskAuditLogDto) {
    const { officeId, taskId, actorUserId, action, ...rest } = createTaskAuditLogDto;

    // Validate office exists
    const office = await this.prisma.office.findUnique({
      where: { id: officeId },
    });

    if (!office) {
      throw new NotFoundException(`Office with ID ${officeId} not found`);
    }

    // Validate task exists
    const task = await this.prisma.task.findUnique({
      where: { id: taskId },
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${taskId} not found`);
    }

    // Validate actor user exists
    const actor = await this.prisma.user.findUnique({
      where: { id: actorUserId },
    });

    if (!actor) {
      throw new NotFoundException(`Actor user with ID ${actorUserId} not found`);
    }

    const auditLog = await this.prisma.taskAuditLog.create({
      data: {
        officeId,
        taskId,
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
        task: {
          select: {
            id: true,
            title: true,
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
   * Get all task audit logs
   * - Returns all audit log records
   */
  async findAll() {
    const auditLogs = await this.prisma.taskAuditLog.findMany({
      include: {
        office: {
          select: {
            id: true,
            name: true,
          },
        },
        task: {
          select: {
            id: true,
            title: true,
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
    const auditLog = await this.prisma.taskAuditLog.findUnique({
      where: { id },
      include: {
        office: {
          select: {
            id: true,
            name: true,
          },
        },
        task: {
          select: {
            id: true,
            title: true,
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
      throw new NotFoundException(`Task audit log with ID ${id} not found`);
    }

    return auditLog;
  }

  /**
   * Get audit logs by task
   * - Returns all audit logs for a specific task
   */
  async findByTask(taskId: string) {
    const auditLogs = await this.prisma.taskAuditLog.findMany({
      where: { taskId },
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
    const auditLogs = await this.prisma.taskAuditLog.findMany({
      where: { officeId },
      include: {
        task: {
          select: {
            id: true,
            title: true,
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
    const auditLogs = await this.prisma.taskAuditLog.findMany({
      where: { actorUserId },
      include: {
        office: {
          select: {
            id: true,
            name: true,
          },
        },
        task: {
          select: {
            id: true,
            title: true,
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
  async findByAction(action: TaskAction) {
    const auditLogs = await this.prisma.taskAuditLog.findMany({
      where: { action },
      include: {
        office: {
          select: {
            id: true,
            name: true,
          },
        },
        task: {
          select: {
            id: true,
            title: true,
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
    const auditLog = await this.prisma.taskAuditLog.findUnique({
      where: { id },
    });

    if (!auditLog) {
      throw new NotFoundException(`Task audit log with ID ${id} not found`);
    }

    await this.prisma.taskAuditLog.delete({
      where: { id },
    });

    return { message: 'Task audit log deleted successfully' };
  }
}
