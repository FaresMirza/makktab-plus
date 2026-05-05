import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectDto } from './create-project.dto';
import { IsString, IsEnum, IsOptional } from 'class-validator';
import { ProjectStatus } from 'prisma/src/generated/prisma-client/client';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProjectDto extends PartialType(CreateProjectDto) {
  @ApiProperty({ 
    description: 'The name of the project', 
    example: 'Mobile App Development', 
    required: false 
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ 
    description: 'The description of the project', 
    example: 'Building a mobile application for iOS and Android', 
    required: false 
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ 
    description: 'The ID of the user who manages this project', 
    example: 'user-uuid-456', 
    required: false 
  })
  @IsString()
  @IsOptional()
  projectManagerUserId?: string;

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
