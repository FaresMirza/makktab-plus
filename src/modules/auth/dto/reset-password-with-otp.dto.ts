
import { IsString, IsNotEmpty, MinLength, IsEmail } from 'class-validator';

// Actually, standard class-validator match is not built-in usually, need custom. I will skip custom decorator for now and validate in service to be safe and avoid extra files unless I see a decorators folder.

export class ResetPasswordWithOtpDto {
    @IsEmail()
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
