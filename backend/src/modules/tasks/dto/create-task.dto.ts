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

  @ApiProperty({ description: 'The public ID (UUID) of the project this task belongs to', example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' })
  @IsString()
  @IsNotEmpty()
  projectId: string;

  @ApiProperty({ description: 'The public ID (UUID) of the user who created this task', example: 'b2c3d4e5-f6a7-8901-bcde-f12345678901' })
  @IsString()
  @IsNotEmpty()
  createdByUserId: string;

  @ApiProperty({ description: 'The public ID (UUID) of the user this task is assigned to', example: 'c3d4e5f6-a7b8-9012-cdef-123456789012' })
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
