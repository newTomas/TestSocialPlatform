// src/middlewares/error.middleware.ts
import { Request, Response, NextFunction } from 'express';

// Интерфейс для кастомных ошибок, которые мы можем выбрасывать
interface CustomError extends Error {
  statusCode?: number;
}

export const errorMiddleware = (
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = error.statusCode || 500;
  const message = error.message || 'Something went wrong';

  console.error(`[Error] Status ${status}: ${message}`);

  return res.status(status).json({
    status,
    message,
  });
};
