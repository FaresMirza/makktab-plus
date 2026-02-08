import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './modules/prisma/prisma.module';
import { UsersModule } from './modules/users/users.module';
import { OfficesModule } from './modules/offices/offices.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { RolesModule } from './modules/roles/roles.module';
import { OtpCodesModule } from './modules/otp-codes/otp-codes.module';
import { LoginAttemptsModule } from './modules/login-attempts/login-attempts.module';
import { ProjectAuditLogsModule } from './modules/project-audit-logs/project-audit-logs.module';
import { TaskAuditLogsModule } from './modules/task-audit-logs/task-audit-logs.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    UsersModule,
    OfficesModule,
    ProjectsModule,
    TasksModule,
    RolesModule,
    OtpCodesModule,
    LoginAttemptsModule,
    ProjectAuditLogsModule,
    TaskAuditLogsModule,
  ],
})
export class AppModule {}
