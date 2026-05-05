import { IsEmail, IsNotEmpty, IsEnum, IsString, Length } from 'class-validator';
import { OtpPurpose } from 'prisma/src/generated/prisma-client/client';

export class VerifyOtpDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @Length(6, 6, { message: 'OTP must be exactly 6 digits.' })
    otp: string;

    @IsEnum(OtpPurpose)
    @IsNotEmpty()
    purpose: OtpPurpose;
}
