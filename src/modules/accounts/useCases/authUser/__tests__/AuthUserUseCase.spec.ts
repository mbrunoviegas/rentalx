import { UserRespositoryInMemory } from '@modules/accounts/repositories/inMemory/UsersRepositoryInMemory';
import { AuthUserUseCase } from '@modules/accounts/useCases/authUser/implementations/AuthUserUseCase';
import { CreateUserUseCase } from '@modules/accounts/useCases/createUser/implementations/CreateUserUseCase';
import { AppError } from '@shared/core/errors/AppError';
import { CryptProvider } from '@shared/core/providers/implementations/CryptProvider';
import { ICrypt } from '@shared/core/providers/interfaces/ICrypt';

describe('Auth User Use Case', () => {
  let authUserUseCase: AuthUserUseCase;
  let createUserUseCase: CreateUserUseCase;
  let userRepositoryInMemory: UserRespositoryInMemory;
  let cryptProvider: ICrypt;

  beforeEach(() => {
    userRepositoryInMemory = new UserRespositoryInMemory();
    cryptProvider = new CryptProvider();
    authUserUseCase = new AuthUserUseCase(userRepositoryInMemory, cryptProvider);
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
    const findByEmailSpyOn = jest.spyOn(userRepositoryInMemory, 'findByEmail');
    const compareCryptSpyOn = jest.spyOn(cryptProvider, 'compare');

    expect(async () => {
      await authUserUseCase.execute({ email: 'invalidemail@test.com', password: user.password });
      expect(findByEmailSpyOn).toHaveBeenCalled();
      expect(compareCryptSpyOn).toHaveBeenCalledTimes(0);
    }).rejects.toBeInstanceOf(AppError);
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
    const findByEmailSpyOn = jest.spyOn(userRepositoryInMemory, 'findByEmail');
    const compareCryptSpyOn = jest.spyOn(cryptProvider, 'compare');

    expect(async () => {
      await authUserUseCase.execute({ email: user.email, password: '1234' });
      expect(findByEmailSpyOn).toHaveBeenCalled();
      expect(compareCryptSpyOn).toHaveBeenCalledTimes(1);
    }).rejects.toBeInstanceOf(AppError);
  });
});
