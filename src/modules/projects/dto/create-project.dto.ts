import { IsString, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';
import { ProjectStatus } from 'prisma/src/generated/prisma-client/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
  @ApiProperty({ description: 'The name of the project', example: 'Mobile App Development' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'The description of the project', example: 'Building a mobile application for iOS and Android', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'The ID of the office this project belongs to', example: 'office-uuid-123' })
  @IsString()
  @IsNotEmpty()
  officeId: string;

  @ApiProperty({ description: 'The ID of the user who created this project', example: 'user-uuid-123' })
  @IsString()
  @IsNotEmpty()
  createdByUserId: string;

  @ApiProperty({ description: 'The ID of the user who manages this project', example: 'user-uuid-456' })
  @IsString()
  @IsNotEmpty()
  projectManagerUserId: string;

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
