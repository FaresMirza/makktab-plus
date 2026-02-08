import { Module } from '@nestjs/common';
import { LoginAttemptsService } from './login-attempts.service';
import { LoginAttemptsHelper } from './helpers/login-attempts.helper';
import { LoginAttemptsRepository } from './queries/login-attempts.queries';
import { LoginAttemptsController } from './login-attempts.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [LoginAttemptsController],
  providers: [LoginAttemptsService, LoginAttemptsHelper, LoginAttemptsRepository],
  exports: [LoginAttemptsService], // Export the service so it can be used in other modules
})
export class LoginAttemptsModule { }
