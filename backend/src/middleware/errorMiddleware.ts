import { Request, Response, NextFunction } from 'express';

export interface ApiError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not found - ${req.originalUrl}`) as ApiError;
  error.statusCode = 404;
  next(error);
};

export const errorHandler = (
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  // Prisma errors
  if (err.message && err.message.includes('P2002')) {
    message = 'Duplicate field value entered';
    statusCode = 400;
  }

  // Prisma validation error
  if (err.message && err.message.includes('P2000')) {
    message = 'Validation failed - data too long for field';
    statusCode = 400;
  }

  // Prisma not found error
  if (err.message && err.message.includes('P2025')) {
    message = 'Resource not found';
    statusCode = 404;
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    message = 'Invalid token';
    statusCode = 401;
  }

  if (err.name === 'TokenExpiredError') {
    message = 'Token expired';
    statusCode = 401;
  }

  console.error('Error Stack:', err.stack);

  res.status(statusCode).json({
    success: false,
    error: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};