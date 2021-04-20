import { NextFunction, Request, Response } from 'express';
import { AppError } from '../errors/AppError';
import { AuthProvider } from '../providers/implementations/AuthProvider';

interface IPayload {
  sub: string;
}

const ensureAuthenticatedMiddlware = (request: Request, response: Response, next: NextFunction) => {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    throw new AppError('Missing token', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub: userId } = AuthProvider.verify(token) as IPayload;
    request.headers.userId = userId;
    next();
  } catch (e) {
    throw new AppError('Invalid token', 401);
  }
};

export { ensureAuthenticatedMiddlware };
