import { Module } from '@nestjs/common';
import { AdminsController } from './admins.controller';
import { AdminsService } from './admins.service';
import { AdminsRepository } from './queries/admins.queries';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [AdminsController],
    providers: [AdminsService, AdminsRepository],
})
export class AdminsModule { }
