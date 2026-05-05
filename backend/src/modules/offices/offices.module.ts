import { Module } from '@nestjs/common';
import { OfficesService } from './offices.service';
import { OfficesHelper } from './helpers/offices.helper';
import { OfficesRepository } from './queries/office.queries';
import { OfficesController } from './offices.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [PrismaModule, UsersModule],
  controllers: [OfficesController],
  providers: [OfficesService, OfficesHelper, OfficesRepository],
  exports: [OfficesService, OfficesRepository], // Export the service so it can be used in other modules
})
export class OfficesModule { }
