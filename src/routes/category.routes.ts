import { Router } from 'express';
import { CategoryController } from '../modules/cars/controllers/CategoryController';

const categoryRoutes = Router();
const categoryController = new CategoryController();

categoryRoutes.get('/', categoryController.create);
categoryRoutes.post('/', categoryController.create);

export { categoryRoutes };
