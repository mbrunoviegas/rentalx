import { Router } from 'express';
import { CreateRentalController } from '@modules/rentals/useCases/createRental/CreateRentalController';
import { ensureAuthenticatedMiddlware } from '../middlewares/EnsureAuthenticatedMiddleware';

const rentalsRoutes = Router();

const createRentalController = new CreateRentalController();

rentalsRoutes.post('/', ensureAuthenticatedMiddlware, createRentalController.handle);

export { rentalsRoutes };
