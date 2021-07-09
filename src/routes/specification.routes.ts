import { Router } from 'express';
import { CreateSpecificationController } from '@modules/cars/useCases/createSpecifications/CreateSpecificationController';
import { ListSpecificationController } from '@modules/cars/useCases/listSpecification/ListSpecificationController';

const createSpecificationController = new CreateSpecificationController();
const listSpecificationController = new ListSpecificationController();

const specificationRoutes = Router();
specificationRoutes.post('/', createSpecificationController.handle);
specificationRoutes.get('/', listSpecificationController.handle);

export { specificationRoutes };
