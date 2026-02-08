import { ApiProperty } from '@nestjs/swagger';
import { OtpPurpose, OtpChannel } from 'prisma/src/generated/prisma-client/client';

export class OtpCode {
  id: string;
  userId: string;
  officeId: string;
  purpose: OtpPurpose;
  channel: OtpChannel;
  codeHash: string;
  attempts: number;
  deviceFingerprint: string;
  ip: string;
  userAgent: string;
  expiresAt: Date;
  usedAt: Date;
  createdAt: Date;
}
