import { Router } from 'express';
import { CreateRentalController } from '@modules/rentals/useCases/createRental/CreateRentalController';
import { DevolutionRentalController } from '@modules/rentals/useCases/devolutionRental/DevolutionRentalController';
import { ensureAuthenticatedMiddlware } from '../middlewares/EnsureAuthenticatedMiddleware';

const rentalsRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();

rentalsRoutes.post('/', ensureAuthenticatedMiddlware, createRentalController.handle);
rentalsRoutes.post('/devolution/:rental_id', ensureAuthenticatedMiddlware, devolutionRentalController.handle);

export { rentalsRoutes };
