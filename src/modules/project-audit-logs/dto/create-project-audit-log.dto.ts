import { IsString, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';
import { ProjectAction } from 'prisma/src/generated/prisma-client/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectAuditLogDto {
  @ApiProperty({ description: 'The ID of the office', example: 'office-uuid-123' })
  @IsString()
  @IsNotEmpty()
  officeId: string;

  @ApiProperty({ description: 'The ID of the project', example: 'project-uuid-123' })
  @IsString()
  @IsNotEmpty()
  projectId: string;

  @ApiProperty({ description: 'The ID of the user who performed the action', example: 'user-uuid-123' })
  @IsString()
  @IsNotEmpty()
  actorUserId: string;

  @ApiProperty({ 
    description: 'The action performed', 
    example: 'UPDATE', 
    enum: ProjectAction 
  })
  @IsEnum(ProjectAction)
  @IsNotEmpty()
  action: ProjectAction;

  @ApiProperty({ description: 'The name of the field that was changed', example: 'status', required: false })
  @IsString()
  @IsOptional()
  fieldName?: string;

  @ApiProperty({ description: 'The old value before the change', example: 'IN_PROGRESS', required: false })
  @IsString()
  @IsOptional()
  oldValue?: string;

  @ApiProperty({ description: 'The new value after the change', example: 'COMPLETED', required: false })
  @IsString()
  @IsOptional()
  newValue?: string;

  @ApiProperty({ description: 'IP address of the request', example: '192.168.1.1', required: false })
  @IsString()
  @IsOptional()
  ip?: string;

  @ApiProperty({ description: 'Device fingerprint for security', example: 'device-hash-123', required: false })
  @IsString()
  @IsOptional()
  deviceFingerprint?: string;

  @ApiProperty({ description: 'Geographic location', example: 'New York, US', required: false })
  @IsString()
  @IsOptional()
  geo?: string;
}
