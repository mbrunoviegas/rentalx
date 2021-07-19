import { Router } from 'express';
import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';
import { ensureAdminMiddleware } from '../middlewares/EnsureAdmin';
import { ensureAuthenticatedMiddlware } from '../middlewares/EnsureAuthenticatedMiddleware';

const carRoutes = Router();

const createCarController = new CreateCarController();

carRoutes.post('/', ensureAuthenticatedMiddlware,
  ensureAdminMiddleware, createCarController.handle);

export { carRoutes };
