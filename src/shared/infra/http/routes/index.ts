import { Router } from 'express';
import { ensureAuthenticatedMiddlware } from '@shared/infra/http/middlewares/EnsureAuthenticatedMiddleware';
import { accountRoutes } from './account.routes';
import { authRoutes } from './auth.routes';
import { carRoutes } from './car.routes';
import { categoryRoutes } from './category.routes';
import { specificationRoutes } from './specification.routes';

const routes = Router();
routes.use('/categories', categoryRoutes);
routes.use('/specifications', ensureAuthenticatedMiddlware, specificationRoutes);
routes.use('/users', accountRoutes);
routes.use('/auth', authRoutes);
routes.use('/cars', carRoutes);

export default routes;
