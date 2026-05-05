import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class ResetPasswordWithOtpDto {
    // Accepts either a username or an email — the service layer
    // handles both via findByUsername || findByEmail.
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    otp: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    newPassword: string;

    @IsString()
    @IsNotEmpty()
    confirmPassword: string;
}
