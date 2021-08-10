import { NextFunction, Request, Response } from 'express';
import { UserRepository } from '@shared/infra/database/typeorm/repositories/implementations/UserRepository';
import { AppError } from '@shared/core/errors/AppError';

const ensureAdminMiddleware = async (request: Request, response: Response, next: NextFunction) => {
  const { id } = request.user;
  const userRepository = new UserRepository();

  const user = await userRepository.findById(id);

  if (!user.isAdmin) {
    throw new AppError('User is not an admin.');
  }

  next();
};

export { ensureAdminMiddleware };
