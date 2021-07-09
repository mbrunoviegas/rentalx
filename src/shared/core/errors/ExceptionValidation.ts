import { NextFunction, Request, Response } from 'express';
import { AppError } from './AppError';
import { IExceptionValidation } from './interfaces/IExceptionValidation';

class ExceptionValidation implements IExceptionValidation {
  public catchError =
    (error: Error, request: Request, response: Response, next: NextFunction): Response => {
      if (error instanceof AppError) {
        return response.status(error.statusCode).json({
          message: error.message,
        });
      }

      return response.status(500).json({ message: `Internal Server Error - ${error.message}` });
    }
}

export { ExceptionValidation };
