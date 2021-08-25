import { Router } from 'express';
import multer from 'multer';
import {
  CreateUserController,
} from '@modules/accounts/useCases/createUser/CreateUserController';
import { ResetPasswordController } from '@modules/accounts/useCases/resetPassword/ResetPasswordController';
import { SendForgottenPasswordEmailController } from '@modules/accounts/useCases/sendForgottenPasswordEmail/SendForgottenPasswordEmailController';
import {
  UpdateUseAvatarController,
} from '@modules/accounts/useCases/updateAvatar/UpdateUseAvatarController';
import uploadConfig from '@shared/config/upload';
import {
  ensureAuthenticatedMiddlware,
} from '@shared/infra/http/middlewares/EnsureAuthenticatedMiddleware';

const accountRoutes = Router();
const uploadAvatar = multer(uploadConfig);

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUseAvatarController();
const sendForgottenPasswordEmailController = new SendForgottenPasswordEmailController();
const resetPasswordController = new ResetPasswordController();

accountRoutes.post('/', createUserController.handle);
accountRoutes.patch(
  '/avatar',
  ensureAuthenticatedMiddlware,
  uploadAvatar.single('avatar'),
  updateUserAvatarController.handle,
);
accountRoutes.post('/password/forgot', sendForgottenPasswordEmailController.handle);
accountRoutes.post('/password/reset', resetPasswordController.handle);

export { accountRoutes };
