import { Module } from '@nestjs/common';
import { AdminsController } from './admins.controller';
import { AdminsService } from './admins.service';
import { AdminsRepository } from './queries/admins.queries';
import { PrismaModule } from '../prisma/prisma.module';
import { AuditModule } from '../audit/audit.module';
import { AdminsHelper } from './helpers/admins.helper';

@Module({
    imports: [PrismaModule, AuditModule],
    controllers: [AdminsController],
    providers: [AdminsService, AdminsRepository, AdminsHelper],
})
export class AdminsModule { }
