export type LogLevel = 'error' | 'warn' | 'info' | 'http' | 'verbose' | 'debug' | 'silly';

export interface LogContext {
  requestId?: string;
  userId?: string;
  [key: string]: unknown;
}

export interface Logger {
  error(message: string, meta?: LogContext): void;
  warn(message: string, meta?: LogContext): void;
  info(message: string, meta?: LogContext): void;
  debug(message: string, meta?: LogContext): void;
}
