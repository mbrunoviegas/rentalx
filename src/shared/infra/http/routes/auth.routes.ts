import { Router } from 'express';
import { AuthUserController } from '@modules/auth/useCases/authUser/AuthUserController';
import { CreateRefreshTokenController } from '@modules/auth/useCases/createRefreshToken/CreateRefreshTokenController';

const authRoutes = Router();

const authUserController = new AuthUserController();
const createRefreshTokenController = new CreateRefreshTokenController();

authRoutes.post('/', authUserController.handle);
authRoutes.post('/refresh-token', createRefreshTokenController.handle);

export { authRoutes };
