import { container } from 'tsyringe';
import { CategoryRepositoryImpl } from '../../modules/cars/repositories/implementations/CategoryRepositoryImpl';
import { ICategoryRepository } from '../../modules/cars/repositories/interfaces/ICategoryRepository';

container.registerSingleton<ICategoryRepository>(
  'CategoryRepositoryImpl',
  CategoryRepositoryImpl,
);
