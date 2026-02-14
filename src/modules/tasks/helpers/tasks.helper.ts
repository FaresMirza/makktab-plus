import { Injectable, NotFoundException } from '@nestjs/common';
import { TasksRepository } from '../queries/tasks.queries';
import { ProjectsRepository } from '../../projects/queries/projects.queries';
import { UsersRepository } from '../../users/queries/users.queries';

@Injectable()
export class TasksHelper {
    constructor(
        private readonly tasksRepository: TasksRepository,
        private readonly projectsRepository: ProjectsRepository,
        private readonly usersRepository: UsersRepository,
    ) { }

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
     * Validate task exists by publicId, returns the task entity
     */
    async validateTaskExists(taskPublicId: string) {
        const task = await this.tasksRepository.findByPublicIdSimple(taskPublicId);

        if (!task) {
            throw new NotFoundException(`Task with ID ${taskPublicId} not found`);
        }

        return task;
    }
}
