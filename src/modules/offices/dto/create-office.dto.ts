import { IsString, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';
import { OfficeStatus } from 'prisma/src/generated/prisma-client/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOfficeDto {
  @ApiProperty({ description: 'The name of the office', example: 'Headquarters' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'The ID of the user who owns this office', example: 'user-uuid-123' })
  @IsString()
  @IsNotEmpty()
  ownerUserId: string;

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
