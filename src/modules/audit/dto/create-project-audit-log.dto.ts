import { IsString, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';
import { ProjectAction } from '../../../../prisma/src/generated/prisma-client/client';

export class CreateProjectAuditLogDto {
    @IsString()
    @IsNotEmpty()
    officeId: string;

    @IsString()
    @IsNotEmpty()
    projectId: string;

    @IsString()
    @IsNotEmpty()
    actorUserId: string;

    @IsEnum(ProjectAction)
    @IsNotEmpty()
    action: ProjectAction;

    @IsString()
    @IsOptional()
    fieldName?: string;

    @IsString()
    @IsOptional()
    oldValue?: string;

    @IsString()
    @IsOptional()
    newValue?: string;

    @IsString()
    @IsOptional()
    ip?: string;

    @IsString()
    @IsOptional()
    deviceFingerprint?: string;

    @IsString()
    @IsOptional()
    geo?: string;
}
