import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ProjectsHelper {
    constructor(private readonly prisma: PrismaService) { }

    async validateOfficeExists(officeId: string) {
        const office = await this.prisma.office.findUnique({
            where: { id: officeId },
        });

        if (!office) {
            throw new NotFoundException(`Office with ID ${officeId} not found`);
        }
    }

    async validateUserExists(userId: string, role?: string) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            const roleMsg = role ? `${role} ` : '';
            throw new NotFoundException(`${roleMsg}User with ID ${userId} not found`);
        }
    }

    async validateProjectExists(id: string) {
        const project = await this.prisma.project.findUnique({
            where: { id },
        });

        if (!project) {
            throw new NotFoundException(`Project with ID ${id} not found`);
        }

        return project;
    }

    validateDeleteCondition(project: { _count: { tasks: number } }) {
        if (project._count.tasks > 0) {
            throw new ConflictException(
                'Cannot permanently delete project with existing tasks. Please remove them first.',
            );
        }
    }

    formatStatistics(project: any) {
        const tasksByStatus = project.tasks.reduce(
            (acc: any, task: any) => {
                acc[task.status] = (acc[task.status] || 0) + 1;
                return acc;
            },
            {} as Record<string, number>,
        );

        return {
            projectId: project.id,
            projectName: project.name,
            status: project.status,
            statistics: {
                totalTasks: project.tasks.length,
                tasksByStatus,
            },
        };
    }
}
