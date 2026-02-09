import { Injectable, NotFoundException } from '@nestjs/common';
import { AuditRepository } from '../queries/audit.queries';
import { UsersRepository } from '../../users/queries/users.queries';
import { OfficesRepository } from '../../offices/queries/office.queries';
import { ProjectsRepository } from '../../projects/queries/projects.queries';
import { TasksRepository } from '../../tasks/queries/tasks.queries';

@Injectable()
export class AuditHelper {
    constructor(
        private readonly auditRepository: AuditRepository,
        private readonly usersRepository: UsersRepository,
        private readonly officesRepository: OfficesRepository,
        private readonly projectsRepository: ProjectsRepository,
        private readonly tasksRepository: TasksRepository,
    ) { }

    async validateUserExists(userId: string) {
        const user = await this.usersRepository.findByIdSimple(userId);
        if (!user) throw new NotFoundException(`User with ID ${userId} not found`);
    }

    async validateOfficeExists(officeId: string) {
        const office = await this.officesRepository.findByIdSimple(officeId);
        if (!office) throw new NotFoundException(`Office with ID ${officeId} not found`);
    }

    async validateProjectExists(projectId: string) {
        const project = await this.projectsRepository.findByIdSimple(projectId);
        if (!project) throw new NotFoundException(`Project with ID ${projectId} not found`);
    }

    async validateTaskExists(taskId: string) {
        const task = await this.tasksRepository.findByIdSimple(taskId);
        if (!task) throw new NotFoundException(`Task with ID ${taskId} not found`);
    }

    async validateProjectLogExists(id: string) {
        const log = await this.auditRepository.findProjectLogById(id);
        if (!log) throw new NotFoundException(`Project audit log with ID ${id} not found`);
        return log;
    }



    async validateTaskLogExists(id: string) {
        const log = await this.auditRepository.findTaskLogById(id);
        if (!log) throw new NotFoundException(`Task audit log with ID ${id} not found`);
        return log;
    }
}
