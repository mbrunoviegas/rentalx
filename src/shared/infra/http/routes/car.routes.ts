import { Router } from 'express';
import multer from 'multer';
import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';
import { CreateCarSpecificationController } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController';
import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsController';
import { UploadCarsImagesController } from '@modules/cars/useCases/uploadCarsImage/UploadCarsImagesController';
import uploadConfig from '@shared/config/upload';
import { ensureAdminMiddleware } from '../middlewares/EnsureAdmin';
import { ensureAuthenticatedMiddlware } from '../middlewares/EnsureAuthenticatedMiddleware';

const carRoutes = Router();
const uploadImages = multer(uploadConfig.upload('./tmp/cars'));

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCaSpecificationController = new CreateCarSpecificationController();
const carsImageController = new UploadCarsImagesController();

carRoutes.post('/', ensureAuthenticatedMiddlware,
  ensureAdminMiddleware, createCarController.handle);
carRoutes.get('/available', listAvailableCarsController.handle);
carRoutes.post('/specifications/:id',
  ensureAuthenticatedMiddlware,
  ensureAdminMiddleware,
  createCaSpecificationController.handle);
carRoutes.post('/images/:id',
  ensureAuthenticatedMiddlware,
  ensureAdminMiddleware,
  uploadImages.array('images'),
  carsImageController.handle);

export { carRoutes };
