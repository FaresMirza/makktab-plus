import { ApiProperty } from '@nestjs/swagger';
import { LoginMethod } from 'prisma/src/generated/prisma-client/client';

export class LoginAttempt {
  id: string;
  userId: string;
  officeId: string;
  success: boolean;
  method: LoginMethod;
  ip: string;
  userAgent: string;
  deviceFingerprint: string;
  geo: string;
  failReason: string;
  createdAt: Date;
}
