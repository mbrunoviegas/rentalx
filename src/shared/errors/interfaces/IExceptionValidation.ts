import { Request, Response, NextFunction } from 'express';

interface IExceptionValidation {
  catchError(error: Error, request: Request, response: Response, next: NextFunction): Response;
}

export { IExceptionValidation };
