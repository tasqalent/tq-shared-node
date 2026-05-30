import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import type { JwtPayload } from '../types/auth.types';
import { ERROR_CODES } from '../constants/errors';
import { HTTP_STATUS } from '../constants/http-status';
import { errorResponse } from '../utils/response';

const BEARER_PREFIX = 'Bearer ';

function extractToken(authHeader: string): string | null {
  if (!authHeader.startsWith(BEARER_PREFIX)) return null;
  const token = authHeader.slice(BEARER_PREFIX.length).trim();
  return token || null;
}

export function requireAuth(secret: string) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const raw = req.headers.authorization;
    if (!raw) {
      errorResponse(
        res,
        ERROR_CODES.UNAUTHORIZED,
        'Missing authorization header',
        HTTP_STATUS.UNAUTHORIZED
      );
      return;
    }

    const token = extractToken(raw);
    if (!token) {
      errorResponse(
        res,
        ERROR_CODES.UNAUTHORIZED,
        'Invalid authorization header format',
        HTTP_STATUS.UNAUTHORIZED
      );
      return;
    }

    let decoded: jwt.JwtPayload;
    try {
      decoded = jwt.verify(token, secret, {
        algorithms: ['HS256'],
        issuer: 'tasqalent',
      }) as jwt.JwtPayload;
    } catch (err) {
      if (err instanceof jwt.TokenExpiredError) {
        errorResponse(res, ERROR_CODES.UNAUTHORIZED, 'Token expired', HTTP_STATUS.UNAUTHORIZED);
        return;
      }
      errorResponse(
        res,
        ERROR_CODES.UNAUTHORIZED,
        'Invalid or malformed token',
        HTTP_STATUS.UNAUTHORIZED
      );
      return;
    }

    req.user = {
      sub: decoded.sub as string,
      username: decoded.username as string,
      email: decoded.email as string,
      role: decoded.role as JwtPayload['role'],
    };
    next();
  };
}

export function requireRole(...allowedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      errorResponse(
        res,
        ERROR_CODES.UNAUTHORIZED,
        'Authorization required',
        HTTP_STATUS.UNAUTHORIZED
      );
      return;
    }
    if (!allowedRoles.includes(req.user.role)) {
      errorResponse(res, ERROR_CODES.FORBIDDEN, 'Insufficient permissions', HTTP_STATUS.FORBIDDEN);
      return;
    }
    next();
  };
}
