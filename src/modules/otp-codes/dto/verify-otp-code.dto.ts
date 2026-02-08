import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyOtpCodeDto {
  @ApiProperty({ description: 'The OTP code to verify', example: '123456' })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({ description: 'The ID of the user', example: 'user-uuid-123' })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ description: 'The ID of the office', example: 'office-uuid-123' })
  @IsString()
  @IsNotEmpty()
  officeId: string;
}
