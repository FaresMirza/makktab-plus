import { Module } from '@nestjs/common';
import { OtpCodesService } from './otp-codes.service';
import { OtpCodesController } from './otp-codes.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [OtpCodesController],
  providers: [OtpCodesService],
  exports: [OtpCodesService], // Export the service so it can be used in other modules
})
export class OtpCodesModule {}
