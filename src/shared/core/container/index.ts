import { container } from 'tsyringe';
import { UserRepository } from '@modules/accounts/repositories/implementations/UserRepository';
import { UsersTokensRepository } from '@modules/accounts/repositories/implementations/UsersTokensRepository';
import { IUserRepository } from '@modules/accounts/repositories/IUserRepository';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUseusTokensRepository';
import { ICarsImageRepository } from '@modules/cars/repositories/ICarsImageRepository';
import { ICategoryRepository } from '@modules/cars/repositories/ICategoryRepository';
import { CarsImageRepository } from '@modules/cars/repositories/implementations/CarsImageRepository';
import { CategoryRepository } from '@modules/cars/repositories/implementations/CategoryRepository';
import { SpecificationRepository } from '@modules/cars/repositories/implementations/SpecificationRepository';
import { ISpecificationRepository } from '@modules/cars/repositories/ISpecificationRepository';
import { RentalsRepository } from '@modules/rentals/repositories/implementations/RentalsRepository';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { CryptProvider } from '@shared/core/providers/implementations/CryptProvider';
import { ICrypt } from '@shared/core/providers/interfaces/ICrypt';
import { ICarsRepository } from '@shared/infra/database/typeorm/repositories/ICarsRepository';
import { CarsRepository } from '@shared/infra/database/typeorm/repositories/implementations/CarsRepository';
import { DateProvider } from '../providers/implementations/DateProvider';
import { IDateProvider } from '../providers/interfaces/IDateProvider';

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

container.register<ICrypt>(
  'CryptProvider',
  CryptProvider,
);

container.registerSingleton<ICarsRepository>(
  'CarsRepository',
  CarsRepository,
);

container.registerSingleton<ICarsImageRepository>(
  'CarsImageRepository',
  CarsImageRepository,
);

container.registerSingleton<IRentalsRepository>(
  'RentalsRepository',
  RentalsRepository,
);

container.registerSingleton<IDateProvider>(
  'DateProvider',
  DateProvider,
);

container.registerSingleton<IUsersTokensRepository>(
  'UsersTokensRepository',
  UsersTokensRepository,
);
