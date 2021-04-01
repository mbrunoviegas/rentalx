import { container } from 'tsyringe';
import { CategoryRepositoryImpl } from '../../modules/cars/repositories/implementations/CategoryRepositoryImpl';
import { SpecificationRepositoryImpl } from '../../modules/cars/repositories/implementations/SpecificationRepositoryImpl';
import { ICategoryRepository } from '../../modules/cars/repositories/interfaces/ICategoryRepository';
import { ISpecificationRepository } from '../../modules/cars/repositories/interfaces/ISpecificationRepository';

container.registerSingleton<ICategoryRepository>(
  'CategoryRepositoryImpl',
  CategoryRepositoryImpl,
);

container.registerSingleton<ISpecificationRepository>(
  'SpecificationRepositoryImpl',
  SpecificationRepositoryImpl,
);
