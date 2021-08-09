import { Router } from 'express';
import { CreateRentalController } from '@modules/rentals/useCases/createRental/CreateRentalController';
import { DevolutionRentalController } from '@modules/rentals/useCases/devolutionRental/DevolutionRentalController';
import { ListRentalsByUserController } from '@modules/rentals/useCases/listRentalsByUser/ListRentalsByUserController';
import { ensureAuthenticatedMiddlware } from '../middlewares/EnsureAuthenticatedMiddleware';

const rentalsRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalsByUserController = new ListRentalsByUserController();

rentalsRoutes.post('/', ensureAuthenticatedMiddlware, createRentalController.handle);
rentalsRoutes.post('/devolution/:rental_id', ensureAuthenticatedMiddlware, devolutionRentalController.handle);
rentalsRoutes.get('/', ensureAuthenticatedMiddlware, listRentalsByUserController.handle);

export { rentalsRoutes };
