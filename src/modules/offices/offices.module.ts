import { Module } from '@nestjs/common';
import { OfficesService } from './offices.service';
import { OfficesController } from './offices.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [OfficesController],
  providers: [OfficesService],
  exports: [OfficesService], // Export the service so it can be used in other modules
})
export class OfficesModule {}
