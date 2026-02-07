import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({ description: 'The unique key identifier for the role', example: 'admin' })
  @IsString()
  @IsNotEmpty()
  key: string;

  @ApiProperty({ description: 'The scope of the role (e.g., office, project, task)', example: 'office' })
  @IsString()
  @IsNotEmpty()
  scope: string;

  @ApiProperty({ description: 'The display name of the role', example: 'Administrator' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'The description of the role', example: 'Full access to all office resources', required: false })
  @IsString()
  @IsOptional()
  description?: string;
}
