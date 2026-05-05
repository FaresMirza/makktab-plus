import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class FirstLoginResendDto {
    @ApiProperty({ description: 'Username or email of the user requesting a new first-login OTP' })
    @IsString()
    @IsNotEmpty()
    username: string;
}
