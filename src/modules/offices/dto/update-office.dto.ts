import { PartialType } from '@nestjs/mapped-types';
import { CreateOfficeDto } from './create-office.dto';
import { IsString, IsEnum, IsOptional } from 'class-validator';
import { OfficeStatus } from 'prisma/src/generated/prisma-client/client';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateOfficeDto extends PartialType(CreateOfficeDto) {
  @ApiProperty({ 
    description: 'The name of the office', 
    example: 'Headquarters', 
    required: false 
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ 
    description: 'The status of the office', 
    example: 'ACTIVE', 
    enum: OfficeStatus,
    required: false 
  })
  @IsEnum(OfficeStatus)
  @IsOptional()
  status?: OfficeStatus;
}
