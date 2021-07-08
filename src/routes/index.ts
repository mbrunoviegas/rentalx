import { Router } from 'express';
import { ensureAuthenticatedMiddlware } from '../shared/middlewares/EnsureAuthenticatedMiddleware';
import { accountRoutes } from './account.routes';
import { authRoutes } from './auth.routes';
import { categoryRoutes } from './category.routes';
import { specificationRoutes } from './specification.routes';

const routes = Router();
routes.use('/categories', ensureAuthenticatedMiddlware, categoryRoutes);
routes.use('/specifications', ensureAuthenticatedMiddlware, specificationRoutes);
routes.use('/users', ensureAuthenticatedMiddlware, accountRoutes);
routes.use('/auth', authRoutes);

export default routes;
