import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesHelper } from './helpers/roles.helper';
import { RolesRepository } from './queries/roles.queries';
import { RolesController } from './roles.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [RolesController],
  providers: [RolesService, RolesHelper, RolesRepository],
  exports: [RolesService, RolesRepository], // Export the service so it can be used in other modules
})
export class RolesModule { }
