import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersHelper } from './helpers/users.helper';
import { UsersRepository } from './queries/users.queries';
import { UsersController } from './users.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { OfficesRepository } from '../offices/queries/office.queries';

@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
  providers: [UsersService, UsersHelper, UsersRepository, OfficesRepository],
  exports: [UsersService, UsersRepository],
})
export class UsersModule { }
