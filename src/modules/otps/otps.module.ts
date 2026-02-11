import { Module } from '@nestjs/common';
import { OtpService } from './otps.service';
import { OtpHelper } from './helpers/otp.helper';
import { OtpRepository } from './queries/otp.queries';
import { PrismaModule } from '../prisma/prisma.module';
import { UsersModule } from '../users/users.module';
import { AuditModule } from '../audit/audit.module';

@Module({
    imports: [PrismaModule, UsersModule, AuditModule],
    providers: [OtpService, OtpHelper, OtpRepository],
    exports: [OtpService, OtpHelper, OtpRepository],
})
export class OtpModule { }
