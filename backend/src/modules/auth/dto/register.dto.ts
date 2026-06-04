import { IsString, IsNotEmpty, IsEmail, MinLength, Matches } from 'class-validator';

export class RegisterDto {
    @IsString()
    @IsNotEmpty()
    officeName: string;

    @IsString()
    @IsNotEmpty()
    ownerFullName: string;

    @IsString()
    @IsNotEmpty()
    username: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    phone: string;

    @IsString()
    @IsNotEmpty()
    city: string;

    @IsString()
    @IsNotEmpty()
    @Matches(/^\d{10}$/, {
        message: 'Registration number must be exactly 10 digits.',
    })
    registrationNumber: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password: string;
}
