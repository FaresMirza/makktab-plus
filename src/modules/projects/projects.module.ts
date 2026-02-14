import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsHelper } from './helpers/projects.helper';
import { ProjectsRepository } from './queries/projects.queries';
import { ProjectsController } from './projects.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { OfficesRepository } from '../offices/queries/office.queries';
import { UsersRepository } from '../users/queries/users.queries';

@Module({
  imports: [PrismaModule],
  controllers: [ProjectsController],
  providers: [ProjectsService, ProjectsHelper, ProjectsRepository, OfficesRepository, UsersRepository],
  exports: [ProjectsService, ProjectsRepository],
})
export class ProjectsModule { }
