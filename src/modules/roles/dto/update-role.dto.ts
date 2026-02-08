import { PartialType } from '@nestjs/mapped-types';
import { CreateRoleDto } from './create-role.dto';
import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateRoleDto extends PartialType(CreateRoleDto) {
  @ApiProperty({ 
    description: 'The scope of the role', 
    example: 'office', 
    required: false 
  })
  @IsString()
  @IsOptional()
  scope?: string;

  @ApiProperty({ 
    description: 'The display name of the role', 
    example: 'Administrator', 
    required: false 
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ 
    description: 'The description of the role', 
    example: 'Full access to all office resources', 
    required: false 
  })
  @IsString()
  @IsOptional()
  description?: string;
}
