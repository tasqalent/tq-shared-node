import type { Request, Response, NextFunction } from 'express';
import { randomUUID } from 'crypto';

declare module 'express' {
  interface Request {
    id?: string;
  }
}

export function requestIdMiddleware(req: Request, res: Response, next: NextFunction): void {
  const id = (req.headers['x-request-id'] as string) || randomUUID();
  (req as Request & { id: string }).id = id;
  res.setHeader('X-Request-Id', id);
  next();
}
