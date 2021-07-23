import { NextFunction, Request, Response } from 'express';
import { AppError } from '@shared/core/errors/AppError';
import { AuthProvider } from '@shared/core/providers/implementations/AuthProvider';

interface IPayload {
  sub: string;
}

const ensureAuthenticatedMiddlware = (request: Request, response: Response, next: NextFunction): void => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('Missing token', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub: userId } = AuthProvider.verify(token) as IPayload;
    request.user = { id: userId };
    next();
  } catch (e) {
    throw new AppError('Invalid token', 401);
  }
};

export { ensureAuthenticatedMiddlware };
