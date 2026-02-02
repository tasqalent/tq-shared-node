import type { Response } from 'express';
import type { ApiResponse, ApiErrorResponse, PaginatedResponse } from '../types/api.types';
import { HTTP_STATUS } from '../constants/http-status';

export function success<T>(res: Response, data: T, statusCode: number = HTTP_STATUS.OK): Response {
  const body: ApiResponse<T> = { data };
  return res.status(statusCode).json(body);
}

export function paginated<T>(
  res: Response,
  data: T[],
  meta: { page: number; limit: number; total: number; totalPages: number }
): Response {
  const body: PaginatedResponse<T> = { data, meta };
  return res.status(HTTP_STATUS.OK).json(body);
}

export function errorResponse(
  res: Response,
  code: string,
  message: string,
  statusCode: number = HTTP_STATUS.BAD_REQUEST,
  details?: unknown
): Response {
  const body: ApiErrorResponse = {
    error: { code, message, ...(details !== undefined && { details }) },
  };
  return res.status(statusCode).json(body);
}
