import { Module } from '@nestjs/common';
import { LoginAttemptsService } from './login-attempts.service';
import { LoginAttemptsController } from './login-attempts.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [LoginAttemptsController],
  providers: [LoginAttemptsService],
  exports: [LoginAttemptsService], // Export the service so it can be used in other modules
})
export class LoginAttemptsModule {}
