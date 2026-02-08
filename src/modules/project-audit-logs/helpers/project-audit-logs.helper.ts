import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ProjectAuditLogsHelper {
    constructor(private readonly prisma: PrismaService) { }

    async validateOfficeExists(officeId: string) {
        const office = await this.prisma.office.findUnique({ where: { id: officeId } });
        if (!office) throw new NotFoundException(`Office with ID ${officeId} not found`);
    }

    async validateProjectExists(projectId: string) {
        const project = await this.prisma.project.findUnique({ where: { id: projectId } });
        if (!project) throw new NotFoundException(`Project with ID ${projectId} not found`);
    }

    async validateUserExists(userId: string) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user) throw new NotFoundException(`User with ID ${userId} not found`);
    }

    async validateLogExists(id: string) {
        const log = await this.prisma.projectAuditLog.findUnique({ where: { id } });
        if (!log) throw new NotFoundException(`Project audit log with ID ${id} not found`);
        return log;
    }
}
