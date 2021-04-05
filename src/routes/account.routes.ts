import { Router } from 'express';
import { CreateUserController } from '../modules/accounts/useCases/createUser/CreateUserController';

const accountRoutes = Router();

const createUserController = new CreateUserController();

accountRoutes.post('/', createUserController.handle);

export { accountRoutes };
