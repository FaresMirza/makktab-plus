import { IsString, IsNotEmpty, IsEnum, IsOptional, IsDateString, IsNumber } from 'class-validator';
import { ProjectStatus } from 'prisma/src/generated/prisma-client/client';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateProjectDto {
  @ApiProperty({ description: 'The name of the project', example: 'Mobile App Development' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'The description of the project', example: 'Building a mobile application for iOS and Android', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'The public ID (UUID) of the user who manages this project', example: 'c3d4e5f6-a7b8-9012-cdef-123456789012' })
  @IsString()
  @IsNotEmpty()
  projectManagerUserId: string;

  @ApiProperty({ description: 'The name of the client for this project', example: 'Acme Corporation', required: false })
  @IsString()
  @IsOptional()
  clientName?: string;

  @ApiProperty({ description: 'The project budget', example: 50000.00, required: false })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  budget?: number;

  @ApiProperty({ description: 'The project start date (ISO 8601 format)', example: '2024-05-01', required: false })
  @IsDateString()
  @IsOptional()
  startDate?: string;

  @ApiProperty({ description: 'The project end date (ISO 8601 format)', example: '2024-12-31', required: false })
  @IsDateString()
  @IsOptional()
  endDate?: string;

  @ApiProperty({
    description: 'The status of the project',
    example: 'IN_PROGRESS',
    enum: ProjectStatus,
    required: false
  })
  @IsEnum(ProjectStatus)
  @IsOptional()
  status?: ProjectStatus;
}
