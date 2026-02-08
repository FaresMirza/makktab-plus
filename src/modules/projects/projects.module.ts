import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsHelper } from './helpers/projects.helper';
import { ProjectsRepository } from './queries/projects.queries';
import { ProjectsController } from './projects.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ProjectsController],
  providers: [ProjectsService, ProjectsHelper, ProjectsRepository],
  exports: [ProjectsService, ProjectsRepository], // Export the service so it can be used in other modules
})
export class ProjectsModule { }
