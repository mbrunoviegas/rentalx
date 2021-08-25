import { NextFunction, Request, Response } from 'express';
import auth from '@shared/config/auth';
import { AppError } from '@shared/core/errors/AppError';
import { JwtProvider } from '@shared/core/providers/implementations/JwtProvider';

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
    const { sub: userId } = JwtProvider.verify(token, auth.accessTokenSecret) as IPayload;
    request.user = { id: userId };
    next();
  } catch (e) {
    throw new AppError('Invalid token', 401);
  }
};

export { ensureAuthenticatedMiddlware };
