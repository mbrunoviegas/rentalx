import { Router } from 'express';
import multer from 'multer';
import { CreateCategoryController } from '../modules/cars/useCases/createCategory/CreateCategoryController';
import { importCategoryController } from '../modules/cars/useCases/importCategory';
import { listCategoryController } from '../modules/cars/useCases/listCategory';

const upload = multer({ dest: './tmp' });
const categoryRoutes = Router();

const createCategoryController = new CreateCategoryController();

categoryRoutes.post('/', createCategoryController.handle);

categoryRoutes.get('/', (request, response) =>
  listCategoryController.handle(request, response));

categoryRoutes.post('/import', upload.single('file'), (request, response) => {
  importCategoryController.handle(request, response);
});

export { categoryRoutes };
