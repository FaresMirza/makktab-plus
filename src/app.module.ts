import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';
import { PrismaModule } from './modules/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { OfficesModule } from './modules/offices/offices.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { RolesModule } from './modules/roles/roles.module';
import { EnhancedThrottlerGuard } from './common/guards/custom-throttler.guard';
import { ThrottlerStorageService } from './common/storage/throttler-storage.service';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    // Throttler configuration: 10 requests per 60 seconds (1 minute)
    ThrottlerModule.forRoot([
      {
        ttl: 60000, // 60 seconds in milliseconds
        limit: 10,  // 10 requests per TTL window
      },
    ]),
    PrismaModule,
    AuthModule,
    UsersModule,
    OfficesModule,
    ProjectsModule,
    TasksModule,
    RolesModule,
  ],
  providers: [
    // Custom throttler storage for IP blocking
    ThrottlerStorageService,
    // Apply throttler guard globally to all routes
    {
      provide: APP_GUARD,
      useClass: EnhancedThrottlerGuard,
    },
  ],
})
export class AppModule { }
