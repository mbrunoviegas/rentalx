import { Router } from 'express';
import multer from 'multer';
import { createCategoryController } from '../modules/cars/useCases/createCategory';
import { importCategoryController } from '../modules/cars/useCases/importCategory';
import { listCategoryController } from '../modules/cars/useCases/listCategory';

const upload = multer({ dest: './tmp' });

const categoryRoutes = Router();

categoryRoutes.post('/', (request, response) =>
  createCategoryController.handle(request, response));

categoryRoutes.get('/', (request, response) =>
  listCategoryController.handle(request, response));

categoryRoutes.post('/import', upload.single('file'), (request, response) => {
  importCategoryController.handle(request, response);
});

export { categoryRoutes };
