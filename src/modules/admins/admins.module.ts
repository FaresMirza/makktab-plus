import { Module } from '@nestjs/common';
import { AdminsController } from './admins.controller';
import { AdminsService } from './admins.service';
import { PrismaModule } from '../prisma/prisma.module';
import { UsersModule } from '../users/users.module';
import { OfficesModule } from '../offices/offices.module';
import { AuditModule } from '../audit/audit.module';

@Module({
    imports: [PrismaModule, UsersModule, OfficesModule, AuditModule],
    controllers: [AdminsController],
    providers: [AdminsService],
})
export class AdminsModule { }
