import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class FirstLoginVerifyDto {
    @ApiProperty({ description: 'Username or email of the user completing first-login' })
    @IsString()
    @IsNotEmpty()
    username: string;

    @ApiProperty({ description: 'OTP code received by the user' })
    @IsString()
    @IsNotEmpty()
    otp: string;

    @ApiProperty({ description: 'New password the user wants to set (min 8 chars)' })
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    newPassword: string;

    @ApiProperty({ description: 'Confirmation of the new password' })
    @IsString()
    @IsNotEmpty()
    confirmPassword: string;
}
