import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class VerifyLoginOtpDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    otp: string;
}
