import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from 'prisma/src/generated/prisma-client/client';
import { PaginationQueryDto } from '../../../common/dto/pagination.dto';

/**
 * Query params accepted by GET /tasks. Inherits page/limit from
 * PaginationQueryDto and adds the AND-combinable filter fields.
 *
 * Combining all query params into one DTO is required because the
 * controller uses ValidationPipe with forbidNonWhitelisted: true —
 * any field not on the typed DTO would be rejected as 400 even when
 * extracted via @Query('xxx').
 */
export class ListTasksQueryDto extends PaginationQueryDto {
    @IsOptional()
    @IsString()
    projectId?: string;

    @IsOptional()
    @IsEnum(TaskStatus)
    status?: TaskStatus;

    @IsOptional()
    @IsString()
    assignedToUserId?: string;

    @IsOptional()
    @IsString()
    createdByUserId?: string;
}
