import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class VerifyResetPasswordOtpDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    otp: string;
}
