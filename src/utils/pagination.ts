import type { PaginationParams } from '../types/api.types';

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 100;

export function parsePagination(query: Record<string, unknown>): PaginationParams {
  const page = Math.max(1, Number(query.page) || DEFAULT_PAGE);
  const limit = Math.min(MAX_LIMIT, Math.max(1, Number(query.limit) || DEFAULT_LIMIT));
  const sort = typeof query.sort === 'string' ? query.sort : undefined;
  const order = query.order === 'desc' ? 'desc' : 'asc';
  return { page, limit, sort, order };
}

export function getSkip(page: number, limit: number): number {
  return (page - 1) * limit;
}

export function getTotalPages(total: number, limit: number): number {
  return Math.ceil(total / limit) || 1;
}
