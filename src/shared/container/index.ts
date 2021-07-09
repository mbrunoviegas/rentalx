import { container } from 'tsyringe';
import { UserRepository } from '@modules/accounts/repositories/implementations/UserRepository';
import { IUserRepository } from '@modules/accounts/repositories/interfaces/IUserRepository';
import { CategoryRepository } from '@modules/cars/repositories/implementations/CategoryRepository';
import { SpecificationRepository } from '@modules/cars/repositories/implementations/SpecificationRepository';
import { ICategoryRepository } from '@modules/cars/repositories/interfaces/ICategoryRepository';
import { ISpecificationRepository } from '@modules/cars/repositories/interfaces/ISpecificationRepository';
import { CryptProvider } from '@shared/providers/implementations/CryptProvider';
import { ICrypt } from '@shared/providers/interfaces/ICrypt';

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
