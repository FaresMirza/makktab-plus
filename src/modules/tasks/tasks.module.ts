import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksHelper } from './helpers/tasks.helper';
import { TasksRepository } from './queries/tasks.queries';
import { TasksController } from './tasks.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { ProjectsModule } from '../projects/projects.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [PrismaModule, ProjectsModule, UsersModule],
  controllers: [TasksController],
  providers: [TasksService, TasksHelper, TasksRepository],
  exports: [TasksService, TasksRepository], // Export the service so it can be used in other modules
})
export class TasksModule { }
