import winston from 'winston';
import type { Logger, LogContext } from '../types/logger.types';

interface CreateLoggerOptions {
  serviceName: string;
  level?: string;
}

export function createLogger(options: CreateLoggerOptions): Logger {
  const { serviceName, level = process.env.LOG_LEVEL ?? 'info' } = options;

  const baseLogger = winston.createLogger({
    level,
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.errors({ stack: true }),
      winston.format.json()
    ),
    defaultMeta: { service: serviceName, env: process.env.NODE_ENV ?? 'development' },
    transports: [new winston.transports.Console()],
  });

  const wrap =
    (lvl: 'error' | 'warn' | 'info' | 'debug') =>
    (message: string, meta: LogContext = {}): void => {
      baseLogger.log(lvl, message, meta);
    };

  return {
    error: wrap('error'),
    warn: wrap('warn'),
    info: wrap('info'),
    debug: wrap('debug'),
  };
}
