import { IsString, IsNotEmpty, IsEmail, IsEnum } from 'class-validator';
import { OtpPurpose } from 'prisma/src/generated/prisma-client/client';

export class VerifyOtpDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    otp: string;

    @IsEnum(OtpPurpose)
    @IsNotEmpty()
    purpose: OtpPurpose;
}
