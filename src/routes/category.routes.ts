import { Router } from 'express';
import { createCategoryController } from '../modules/cars/useCases/createCategory';
import { listCategoryController } from '../modules/cars/useCases/listCategory';

const categoryRoutes = Router();

categoryRoutes.post('/', (request, response) =>
  createCategoryController.handle(request, response));

categoryRoutes.get('/', (request, response) =>
  listCategoryController.handle(request, response));

export { categoryRoutes };
