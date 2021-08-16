import { AppError } from '@shared/core/errors/AppError';
import { CryptProvider } from '@shared/core/providers/implementations/CryptProvider';
import { DateProvider } from '@shared/core/providers/implementations/DateProvider';
import { ICrypt } from '@shared/core/providers/interfaces/ICrypt';
import { IDateProvider } from '@shared/core/providers/interfaces/IDateProvider';
import { UserRespositoryInMemory } from '@shared/infra/database/typeorm/repositories/inMemory/UsersRepositoryInMemory';
import { UsersTokensRepositoryInMemory } from '@shared/infra/database/typeorm/repositories/inMemory/UsersTokensRepositoryInMemory';
import { CreateUserUseCase } from '../../../../accounts/useCases/createUser/implementations/CreateUserUseCase';
import { AuthUserUseCase } from '../implementations/AuthUserUseCase';

describe('Auth User Use Case', () => {
  let authUserUseCase: AuthUserUseCase;
  let createUserUseCase: CreateUserUseCase;
  let userRepositoryInMemory: UserRespositoryInMemory;
  let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
  let cryptProvider: ICrypt;
  let dateProvider: IDateProvider;

  beforeEach(() => {
    userRepositoryInMemory = new UserRespositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    cryptProvider = new CryptProvider();
    dateProvider = new DateProvider();
    authUserUseCase = new AuthUserUseCase(
      userRepositoryInMemory,
      usersTokensRepositoryInMemory,
      cryptProvider,
      dateProvider,
    );
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory, cryptProvider);
  });

  it('Should authenticate user and return an access_token', async () => {
    const user = {
      name: 'Test User',
      username: 'testuser',
      password: '1234567',
      email: 'usertest@test.com',
      driver_license: '12345',
    };

    await createUserUseCase.execute(user);
    const findByEmailSpyOn = jest.spyOn(userRepositoryInMemory, 'findByEmail');
    const compareCryptSpyOn = jest.spyOn(cryptProvider, 'compare');
    const response = await authUserUseCase.execute({ email: user.email, password: user.password });

    expect(findByEmailSpyOn).toHaveBeenCalled();
    expect(compareCryptSpyOn).toHaveBeenCalled();
    expect(response).toHaveProperty('access_token');
  });

  it('Should not authenticate an nonexistent user', async () => {
    const user = {
      name: 'Test User',
      username: 'testuser',
      password: '1234567',
      email: 'usertest@test.com',
      driver_license: '12345',
    };

    await createUserUseCase.execute(user);

    await expect(authUserUseCase.execute({ email: 'invalidemail@test.com', password: user.password })).rejects.toEqual(new AppError('Email or password incorrect!'));
  });

  it('Should not authenticate an user with incorrect password', async () => {
    const user = {
      name: 'Test User',
      username: 'testuser',
      password: '1234567',
      email: 'usertest@test.com',
      driver_license: '12345',
    };

    await createUserUseCase.execute(user);

    await expect(authUserUseCase.execute({ email: user.email, password: '1234' })).rejects.toEqual(new AppError('Email or password incorrect!'));
  });
});
