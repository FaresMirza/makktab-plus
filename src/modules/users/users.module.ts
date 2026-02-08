import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersHelper } from './helpers/users.helper';
import { UsersRepository } from './queries/users.queries';
import { UsersController } from './users.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
  providers: [UsersService, UsersHelper, UsersRepository],
  exports: [UsersService, UsersRepository], // Export the service so it can be used in other modules (e.g., auth module)
})
export class UsersModule { }
