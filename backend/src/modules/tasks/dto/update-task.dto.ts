import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { IsString, IsEnum, IsOptional, IsDateString } from 'class-validator';
import { TaskStatus } from 'prisma/src/generated/prisma-client/client';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @ApiProperty({ 
    description: 'The title of the task', 
    example: 'Implement user authentication', 
    required: false 
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ 
    description: 'The description of the task', 
    example: 'Create login and registration endpoints with JWT', 
    required: false 
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ 
    description: 'The ID of the user this task is assigned to', 
    example: 'user-uuid-456', 
    required: false 
  })
  @IsString()
  @IsOptional()
  assignedToUserId?: string;

  @ApiProperty({ 
    description: 'The status of the task', 
    example: 'IN_PROGRESS', 
    enum: TaskStatus,
    required: false 
  })
  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;

  @ApiProperty({ 
    description: 'The due date of the task', 
    example: '2026-02-15T00:00:00Z', 
    required: false 
  })
  @IsDateString()
  @IsOptional()
  dueDate?: string;
}
