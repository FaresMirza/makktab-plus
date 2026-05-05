import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

export const DEFAULT_LIMIT = 50;
export const MAX_LIMIT = 200;

/**
 * Standard pagination query params accepted by every list endpoint.
 * - page is 1-based (default 1).
 * - limit defaults to DEFAULT_LIMIT and is capped at MAX_LIMIT.
 */
export class PaginationQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(MAX_LIMIT)
  limit?: number;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface Paginated<T> {
  data: T[];
  meta: PaginationMeta;
}

/**
 * Compute skip/take + page/limit normalised values from a PaginationQueryDto.
 */
export function pagingArgs(input?: PaginationQueryDto) {
  const page = Math.max(1, Number(input?.page) || 1);
  const requested = Number(input?.limit) || DEFAULT_LIMIT;
  const limit = Math.min(MAX_LIMIT, Math.max(1, requested));
  const skip = (page - 1) * limit;
  return { page, limit, skip, take: limit };
}

/**
 * Wrap a [data, total] tuple into a Paginated<T> response.
 */
export function makePaginated<T>(
  rows: T[],
  total: number,
  input?: PaginationQueryDto,
): Paginated<T> {
  const { page, limit } = pagingArgs(input);
  const totalPages = total === 0 ? 0 : Math.ceil(total / limit);
  return { data: rows, meta: { total, page, limit, totalPages } };
}
