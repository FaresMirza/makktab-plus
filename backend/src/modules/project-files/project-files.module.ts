import { Module } from '@nestjs/common';
import { ProjectFilesController } from './project-files.controller';
import { TaskFilesController } from './task-files.controller';
import { ProjectFilesService } from './project-files.service';
import { ProjectFilesRepository } from './queries/project-files.queries';
import { PrismaModule } from '../prisma/prisma.module';
import { ProjectsModule } from '../projects/projects.module';
import { UsersRepository } from '../users/queries/users.queries';

@Module({
  imports: [PrismaModule, ProjectsModule],
  controllers: [ProjectFilesController, TaskFilesController],
  providers: [ProjectFilesService, ProjectFilesRepository, UsersRepository],
  exports: [ProjectFilesService],
})
export class ProjectFilesModule {}
