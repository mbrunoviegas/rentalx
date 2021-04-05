import { Router } from 'express';
import { accountRoutes } from './account.routes';
import { authRoutes } from './auth.routes';
import { categoryRoutes } from './category.routes';
import { specificationRoutes } from './specification.routes';

const routes = Router();
routes.use('/categories', categoryRoutes);
routes.use('/specifications', specificationRoutes);
routes.use('/users', accountRoutes);
routes.use('/auth', authRoutes);

export default routes;
