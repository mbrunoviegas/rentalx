import { Router } from 'express';
import { createSpecificationController } from '../modules/cars/useCases/createSpecifications';

const specificationRoutes = Router();
specificationRoutes.post('/', (request, response) =>
  createSpecificationController.handle(request, response));

export { specificationRoutes };
