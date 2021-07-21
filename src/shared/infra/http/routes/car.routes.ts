import { Router } from 'express';
import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';
import { CreateCarSpecificationController } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController';
import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsController';
import { ensureAdminMiddleware } from '../middlewares/EnsureAdmin';
import { ensureAuthenticatedMiddlware } from '../middlewares/EnsureAuthenticatedMiddleware';

const carRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCaSpecificationController = new CreateCarSpecificationController();

carRoutes.post('/', ensureAuthenticatedMiddlware,
  ensureAdminMiddleware, createCarController.handle);
carRoutes.get('/available', listAvailableCarsController.handle);
carRoutes.post('/specifications/:id', ensureAuthenticatedMiddlware,
  ensureAdminMiddleware, createCaSpecificationController.handle);

export { carRoutes };
