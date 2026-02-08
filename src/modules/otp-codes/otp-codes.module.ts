import { Module } from '@nestjs/common';
import { OtpCodesService } from './otp-codes.service';
import { OtpCodesHelper } from './helpers/otp-codes.helper';
import { OtpCodesRepository } from './queries/otp-codes.queries';
import { OtpCodesController } from './otp-codes.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [OtpCodesController],
  providers: [OtpCodesService, OtpCodesHelper, OtpCodesRepository],
  exports: [OtpCodesService], // Export the service so it can be used in other modules
})
export class OtpCodesModule { }
