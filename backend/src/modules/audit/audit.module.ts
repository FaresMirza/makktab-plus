
import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { AuditController } from './audit.controller';
import { AuditRepository } from './queries/audit.queries';
import { AuditHelper } from './helpers/audit.helper'; // Assuming helper might be useful
import { AuditService } from './audit.service';
// Import other repositories if AuditHelper needs them (Users, Offices, etc.)
// Based on audit.helper.ts imports: UsersRepository, OfficesRepository, ProjectsRepository, TasksRepository.
// I need to import the modules that provide these, or the repositories directly if they are exported from modules.
// Currently modules structure seems to be: UsersModule exports UsersRepository?
// I will check UsersModule etc later or just import Repositories if they are providers in their modules.
// For now, simpler to just assume Repositories are providers.
// But better practice: Import Modules.
import { UsersModule } from '../users/users.module';
import { OfficesModule } from '../offices/offices.module';
import { ProjectsModule } from '../projects/projects.module';
import { TasksModule } from '../tasks/tasks.module';

@Module({
    imports: [
        PrismaModule,
        UsersModule,
        OfficesModule,
        ProjectsModule,
        TasksModule
    ],
    controllers: [AuditController],
    providers: [AuditRepository, AuditHelper, AuditService],
    exports: [AuditRepository, AuditHelper, AuditService],
})
export class AuditModule { }
