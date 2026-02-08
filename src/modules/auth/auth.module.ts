import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthHelper } from './helpers/auth.helper';
import { AuthRepository } from './queries/auth.queries';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [AuthController],
    providers: [AuthService, AuthHelper, AuthRepository],
    exports: [AuthService, AuthHelper, AuthRepository],
})
export class AuthModule { }
