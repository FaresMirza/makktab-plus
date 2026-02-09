import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthHelper } from './helpers/auth.helper';
import { AuthRepository } from './queries/auth.queries';
import { PrismaModule } from '../prisma/prisma.module';
import { AuditModule } from '../audit/audit.module';

import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
    imports: [
        PrismaModule,
        PassportModule,
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET || 'super-secret-key-change-this',
            signOptions: { expiresIn: '15m' },
        }),
        AuditModule,
    ],
    controllers: [AuthController],
    providers: [AuthService, AuthHelper, AuthRepository, JwtStrategy],
    exports: [AuthService, AuthHelper, AuthRepository],
})
export class AuthModule { }
