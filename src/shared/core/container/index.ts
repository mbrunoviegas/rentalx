import { container } from 'tsyringe';
import { UserRepository } from '@modules/accounts/repositories/implementations/UserRepository';
import { IUserRepository } from '@modules/accounts/repositories/IUserRepository';
import { ICarRepository } from '@modules/cars/repositories/ICarRepository';
import { ICategoryRepository } from '@modules/cars/repositories/ICategoryRepository';
import { CarRepository } from '@modules/cars/repositories/implementations/CarRepository';
import { CategoryRepository } from '@modules/cars/repositories/implementations/CategoryRepository';
import { SpecificationRepository } from '@modules/cars/repositories/implementations/SpecificationRepository';
import { ISpecificationRepository } from '@modules/cars/repositories/ISpecificationRepository';
import { CryptProvider } from '@shared/core/providers/implementations/CryptProvider';
import { ICrypt } from '@shared/core/providers/interfaces/ICrypt';

container.registerSingleton<ICategoryRepository>(
  'CategoryRepository',
  CategoryRepository,
);

container.registerSingleton<ISpecificationRepository>(
  'SpecificationRepository',
  SpecificationRepository,
);

container.registerSingleton<IUserRepository>(
  'UserRepository',
  UserRepository,
);

container.register<ICrypt>('CryptProvider', CryptProvider);

container.registerSingleton<ICarRepository>('CarRepository', CarRepository);
