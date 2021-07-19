import { Router } from 'express';
import multer from 'multer';
import { CreateCategoryController } from '@modules/cars/useCases/createCategory/CreateCategoryController';
import { ImportCategoryController } from '@modules/cars/useCases/importCategory/ImportCategoryController';
import { ListCategoryController } from '@modules/cars/useCases/listCategory/ListCategoryController';
import { ensureAdminMiddleware } from '../middlewares/EnsureAdmin';
import { ensureAuthenticatedMiddlware } from '../middlewares/EnsureAuthenticatedMiddleware';

const upload = multer({ dest: './tmp' });
const categoryRoutes = Router();

const createCategoryController = new CreateCategoryController();
const listCategoryController = new ListCategoryController();
const importCategoryController = new ImportCategoryController();

categoryRoutes.post('/', ensureAuthenticatedMiddlware, ensureAdminMiddleware,
  createCategoryController.handle);

categoryRoutes.get('/', listCategoryController.handle);

categoryRoutes.post('/import', upload.single('file'), ensureAuthenticatedMiddlware,
  ensureAdminMiddleware, importCategoryController.handle);

export { categoryRoutes };
