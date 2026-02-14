import { IsString, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';
import { OfficeStatus } from 'prisma/src/generated/prisma-client/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOfficeDto {
  @ApiProperty({ description: 'The name of the office', example: 'Acme Corp Office' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'The public ID (UUID) of the user who owns this office', example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' })
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
