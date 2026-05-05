import { IsEmail, IsNotEmpty, IsEnum, IsOptional, IsString } from 'class-validator';
import { OtpPurpose, OtpChannel } from 'prisma/src/generated/prisma-client/client';

export class SendOtpDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsEnum(OtpPurpose)
    @IsNotEmpty()
    purpose: OtpPurpose;

    @IsEnum(OtpChannel)
    @IsOptional()
    channel?: OtpChannel = OtpChannel.EMAIL;
}
