import type { Role } from '../constants/roles';

export interface JwtPayload {
  sub: string;
  username: string;
  email: string;
  role: Role;
  iat?: number;
  exp?: number;
}

export interface LoginRequest {
  identifier: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  username: string;
  password: string;
  role: Role;
}

export interface TokenPair {
  accessToken: string;
  refreshToken?: string;
  expiresIn: number;
}
