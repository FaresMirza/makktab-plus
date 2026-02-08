import { IsString, IsNotEmpty, MinLength, IsEmail } from 'class-validator';

export class ResetPasswordDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    newPassword: string;
}
