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

  @ApiProperty({ description: 'The public ID (UUID) of the office this project belongs to', example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' })
  @IsString()
  @IsNotEmpty()
  officeId: string;

  @ApiProperty({ description: 'The public ID (UUID) of the user who created this project', example: 'b2c3d4e5-f6a7-8901-bcde-f12345678901' })
  @IsString()
  @IsNotEmpty()
  createdByUserId: string;

  @ApiProperty({ description: 'The public ID (UUID) of the user who manages this project', example: 'c3d4e5f6-a7b8-9012-cdef-123456789012' })
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
