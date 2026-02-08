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

    async validateProjectExists(projectId: string) {
        const project = await this.projectsRepository.findByIdSimple(projectId);

        if (!project) {
            throw new NotFoundException(`Project with ID ${projectId} not found`);
        }
    }

    async validateUserExists(userId: string, role?: string) {
        const user = await this.usersRepository.findByIdSimple(userId);

        if (!user) {
            const roleMsg = role ? `${role} ` : '';
            throw new NotFoundException(`${roleMsg}User with ID ${userId} not found`);
        }
    }

    async validateTaskExists(id: string) {
        const task = await this.tasksRepository.findByIdSimple(id);

        if (!task) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }

        return task;
    }
}
