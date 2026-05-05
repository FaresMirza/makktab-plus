import { IsNotEmpty, IsString, IsUUID, MinLength } from 'class-validator';

export class ActivateAccountDto {
    @IsUUID()
    @IsNotEmpty()
    userPublicId: string;

    @IsString()
    @IsNotEmpty()
    token: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    newPassword: string;
}
