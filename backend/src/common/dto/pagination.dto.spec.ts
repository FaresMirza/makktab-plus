/**
 * White-box unit tests for the pagination helpers.
 *
 * These tests target every branch of pagingArgs and makePaginated:
 *  - default page/limit when no input given
 *  - clamping page to >=1 and limit to [1, MAX_LIMIT]
 *  - skip math (page-1)*limit
 *  - totalPages math, including the total=0 short-circuit
 */
import 'reflect-metadata';
import {
  DEFAULT_LIMIT,
  MAX_LIMIT,
  pagingArgs,
  makePaginated,
} from './pagination.dto';

describe('pagingArgs', () => {
  it('returns defaults when no input is provided', () => {
    expect(pagingArgs()).toEqual({
      page: 1,
      limit: DEFAULT_LIMIT,
      skip: 0,
      take: DEFAULT_LIMIT,
    });
  });

  it('returns defaults when input fields are undefined', () => {
    expect(pagingArgs({})).toEqual({
      page: 1,
      limit: DEFAULT_LIMIT,
      skip: 0,
      take: DEFAULT_LIMIT,
    });
  });

  it('computes skip = (page-1) * limit', () => {
    expect(pagingArgs({ page: 3, limit: 20 })).toEqual({
      page: 3,
      limit: 20,
      skip: 40,
      take: 20,
    });
  });

  it('floors page to 1 when given 0 or a negative value', () => {
    expect(pagingArgs({ page: 0, limit: 10 }).page).toBe(1);
    expect(pagingArgs({ page: -5, limit: 10 }).page).toBe(1);
  });

  it('caps limit at MAX_LIMIT', () => {
    const { limit, take } = pagingArgs({ page: 1, limit: MAX_LIMIT + 500 });
    expect(limit).toBe(MAX_LIMIT);
    expect(take).toBe(MAX_LIMIT);
  });

  it('raises limit to 1 when given 0 or a negative value', () => {
    expect(pagingArgs({ page: 1, limit: 0 }).limit).toBe(DEFAULT_LIMIT);
    expect(pagingArgs({ page: 1, limit: -3 }).limit).toBe(1);
  });
});

describe('makePaginated', () => {
  it('wraps rows + total into the standard envelope', () => {
    const rows = [{ id: 1 }, { id: 2 }];
    const out = makePaginated(rows, 42, { page: 2, limit: 10 });

    expect(out.data).toBe(rows);
    expect(out.meta).toEqual({
      total: 42,
      page: 2,
      limit: 10,
      totalPages: 5,
    });
  });

  it('rounds totalPages up (ceil) for partial last pages', () => {
    const { meta } = makePaginated([], 11, { page: 1, limit: 5 });
    expect(meta.totalPages).toBe(3);
  });

  it('reports totalPages = 0 when total is 0', () => {
    const { meta } = makePaginated([], 0, { page: 1, limit: 10 });
    expect(meta.totalPages).toBe(0);
  });
});
