import { IsString, IsNotEmpty, IsBoolean, IsEnum, IsOptional } from 'class-validator';
import { LoginMethod } from 'prisma/src/generated/prisma-client/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLoginAttemptDto {
  @ApiProperty({ description: 'The ID of the user attempting to login', example: 'user-uuid-123' })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ description: 'The ID of the office', example: 'office-uuid-123' })
  @IsString()
  @IsNotEmpty()
  officeId: string;

  @ApiProperty({ description: 'Whether the login attempt was successful', example: true })
  @IsBoolean()
  @IsNotEmpty()
  success: boolean;

  @ApiProperty({ 
    description: 'The login method used', 
    example: 'PASSWORD', 
    enum: LoginMethod 
  })
  @IsEnum(LoginMethod)
  @IsNotEmpty()
  method: LoginMethod;

  @ApiProperty({ description: 'IP address of the request', example: '192.168.1.1', required: false })
  @IsString()
  @IsOptional()
  ip?: string;

  @ApiProperty({ description: 'User agent string', example: 'Mozilla/5.0...', required: false })
  @IsString()
  @IsOptional()
  userAgent?: string;

  @ApiProperty({ description: 'Device fingerprint for security', example: 'device-hash-123', required: false })
  @IsString()
  @IsOptional()
  deviceFingerprint?: string;

  @ApiProperty({ description: 'Geographic location', example: 'New York, US', required: false })
  @IsString()
  @IsOptional()
  geo?: string;

  @ApiProperty({ description: 'Reason for failure if unsuccessful', example: 'Invalid password', required: false })
  @IsString()
  @IsOptional()
  failReason?: string;
}
