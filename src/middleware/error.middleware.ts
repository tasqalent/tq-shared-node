import type { Request, Response, NextFunction } from 'express';
import { ERROR_CODES } from '../constants/errors';
import { HTTP_STATUS } from '../constants/http-status';
import type { ApiErrorResponse } from '../types/api.types';

export function errorMiddleware(
  err: Error & { statusCode?: number; code?: string },
  req: Request,
  res: Response,
  _next: NextFunction
): void {
  const statusCode = err.statusCode ?? HTTP_STATUS.INTERNAL_SERVER_ERROR;
  const code = err.code ?? ERROR_CODES.INTERNAL_ERROR;
  const message = err.message ?? 'Internal server error';
  const response: ApiErrorResponse = {
    error: { code, message },
    meta: { requestId: (req as Request & { id?: string }).id },
  };
  res.status(statusCode).json(response);
}
