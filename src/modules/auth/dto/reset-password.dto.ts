import { IsString, IsNotEmpty, MinLength, IsEmail } from 'class-validator';

export class ResetPasswordDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    newPassword: string;
}
