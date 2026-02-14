import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { ProjectsRepository } from '../queries/projects.queries';
import { OfficesRepository } from '../../offices/queries/office.queries';
import { UsersRepository } from '../../users/queries/users.queries';

@Injectable()
export class ProjectsHelper {
    constructor(
        private readonly projectsRepository: ProjectsRepository,
        private readonly officesRepository: OfficesRepository,
        private readonly usersRepository: UsersRepository,
    ) { }

    /**
     * Validate office exists by publicId, returns the office entity
     */
    async validateOfficeExists(officePublicId: string) {
        const office = await this.officesRepository.findByPublicIdSimple(officePublicId);

        if (!office) {
            throw new NotFoundException(`Office with ID ${officePublicId} not found`);
        }

        return office;
    }

    /**
     * Validate user exists by publicId, returns the user entity
     */
    async validateUserExists(userPublicId: string, role?: string) {
        const user = await this.usersRepository.findByPublicIdSimple(userPublicId);

        if (!user) {
            const roleMsg = role ? `${role} ` : '';
            throw new NotFoundException(`${roleMsg}User with ID ${userPublicId} not found`);
        }

        return user;
    }

    /**
     * Validate project exists by publicId, returns the project entity
     */
    async validateProjectExists(projectPublicId: string) {
        const project = await this.projectsRepository.findByPublicIdSimple(projectPublicId);

        if (!project) {
            throw new NotFoundException(`Project with ID ${projectPublicId} not found`);
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
            projectId: project.publicId,
            projectName: project.name,
            status: project.status,
            statistics: {
                totalTasks: project.tasks.length,
                tasksByStatus,
            },
        };
    }
}
