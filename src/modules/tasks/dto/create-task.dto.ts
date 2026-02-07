import { IsString, IsNotEmpty, IsEnum, IsOptional, IsDateString } from 'class-validator';
import { TaskStatus } from 'prisma/src/generated/prisma-client/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({ description: 'The title of the task', example: 'Implement user authentication' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'The description of the task', example: 'Create login and registration endpoints with JWT', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'The ID of the project this task belongs to', example: 'project-uuid-123' })
  @IsString()
  @IsNotEmpty()
  projectId: string;

  @ApiProperty({ description: 'The ID of the user who created this task', example: 'user-uuid-123' })
  @IsString()
  @IsNotEmpty()
  createdByUserId: string;

  @ApiProperty({ description: 'The ID of the user this task is assigned to', example: 'user-uuid-456' })
  @IsString()
  @IsNotEmpty()
  assignedToUserId: string;

  @ApiProperty({ 
    description: 'The status of the task', 
    example: 'TODO', 
    enum: TaskStatus,
    required: false 
  })
  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;

  @ApiProperty({ description: 'The due date of the task', example: '2026-02-15T00:00:00Z', required: false })
  @IsDateString()
  @IsOptional()
  dueDate?: string;
}
