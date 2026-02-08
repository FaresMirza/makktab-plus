import { IsString, IsNotEmpty, IsEnum, IsOptional, IsInt, Min } from 'class-validator';
import { OtpPurpose, OtpChannel } from 'prisma/src/generated/prisma-client/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOtpCodeDto {
  @ApiProperty({ description: 'The ID of the user requesting the OTP', example: 'user-uuid-123' })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ description: 'The ID of the office', example: 'office-uuid-123' })
  @IsString()
  @IsNotEmpty()
  officeId: string;

  @ApiProperty({ 
    description: 'The purpose of the OTP', 
    example: 'LOGIN', 
    enum: OtpPurpose 
  })
  @IsEnum(OtpPurpose)
  @IsNotEmpty()
  purpose: OtpPurpose;

  @ApiProperty({ 
    description: 'The channel for OTP delivery', 
    example: 'EMAIL', 
    enum: OtpChannel 
  })
  @IsEnum(OtpChannel)
  @IsNotEmpty()
  channel: OtpChannel;

  @ApiProperty({ description: 'The OTP code (will be hashed)', example: '123456' })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({ description: 'Number of attempts allowed', example: 3, required: false })
  @IsInt()
  @Min(0)
  @IsOptional()
  attempts?: number;

  @ApiProperty({ description: 'Device fingerprint for security', example: 'device-hash-123', required: false })
  @IsString()
  @IsOptional()
  deviceFingerprint?: string;

  @ApiProperty({ description: 'IP address of the request', example: '192.168.1.1', required: false })
  @IsString()
  @IsOptional()
  ip?: string;

  @ApiProperty({ description: 'User agent string', example: 'Mozilla/5.0...', required: false })
  @IsString()
  @IsOptional()
  userAgent?: string;

  @ApiProperty({ description: 'Snapshot of email at time of OTP generation', example: 'user@example.com', required: false })
  @IsString()
  @IsOptional()
  emailSnapshot?: string;

  @ApiProperty({ description: 'Snapshot of phone at time of OTP generation', example: '+1234567890', required: false })
  @IsString()
  @IsOptional()
  phoneSnapshot?: string;
}
