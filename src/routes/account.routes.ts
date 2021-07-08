import { Router } from 'express';
import multer from 'multer';
import {
  CreateUserController,
} from '../modules/accounts/useCases/createUser/CreateUserController';
import {
  UpdateUseAvatarController,
} from '../modules/accounts/useCases/updateAvatar/UpdateUseAvatarController';
import uploadConfig from '../shared/config/upload';
import {
  ensureAuthenticatedMiddlware,
} from '../shared/middlewares/EnsureAuthenticatedMiddleware';

const accountRoutes = Router();
const uploadAvatar = multer(uploadConfig.upload('./tmp/avatar'));

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUseAvatarController();

accountRoutes.post('/', createUserController.handle);
accountRoutes.patch(
  '/avatar',
  ensureAuthenticatedMiddlware,
  uploadAvatar.single('avatar'),
  updateUserAvatarController.handle,
);

export { accountRoutes };
