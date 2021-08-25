import { AppError } from '@shared/core/errors/AppError';
import { DateProvider } from '@shared/core/providers/implementations/DateProvider';
import { MailProviderInMemory } from '@shared/core/providers/inMemory/MailProviderInMemory';
import { IDateProvider } from '@shared/core/providers/IDateProvider';
import { IMailProvider } from '@shared/core/providers/IMailProvider';
import { UserRespositoryInMemory } from '@shared/infra/database/typeorm/repositories/inMemory/UsersRepositoryInMemory';
import { UsersTokensRepositoryInMemory } from '@shared/infra/database/typeorm/repositories/inMemory/UsersTokensRepositoryInMemory';
import { IUserRepository } from '@shared/infra/database/typeorm/repositories/IUserRepository';
import { IUsersTokensRepository } from '@shared/infra/database/typeorm/repositories/IUsersTokensRepository';
import { SendForgottenPasswordEmailUseCase } from '../implementations/SendForgottenPasswordEmailUseCase';

describe('Send Forgotten Password Email Use Case', () => {
  let sendForgottenPasswordEmailUseCase: SendForgottenPasswordEmailUseCase;
  let usersRepository: IUserRepository;
  let usersTokensRepository: IUsersTokensRepository;
  let dateProvider: IDateProvider;
  let mailProvider: IMailProvider;

  beforeEach(async () => {
    usersRepository = new UserRespositoryInMemory();
    usersTokensRepository = new UsersTokensRepositoryInMemory();
    dateProvider = new DateProvider();
    mailProvider = new MailProviderInMemory();
    sendForgottenPasswordEmailUseCase = new SendForgottenPasswordEmailUseCase(
      usersRepository,
      usersTokensRepository,
      dateProvider,
      mailProvider,
    );
  });

  test('Should be able to send an email', async () => {
    const sendMailSpyOn = jest.spyOn(mailProvider, 'sendMail');

    await usersRepository.create({
      driver_license: '1284223601',
      email: 'vi@hudattik.ws',
      name: 'Gilbert Nash',
      password: 'eb5c06d1-f1da-5bc6-8e4e-aebd3a0a5e5b',
      username: 'test',
    });

    await sendForgottenPasswordEmailUseCase.execute('vi@hudattik.ws');

    expect(sendMailSpyOn).toHaveBeenCalled();
  });

  test('Should not be able to send an email to an unexistent user', async () => {
    expect(async () => {
      await sendForgottenPasswordEmailUseCase.execute('cet@tihbuvgor.ir');
    }).rejects.toEqual(new AppError('User does not exist'));
  });

  test('Should be able to create and save a new token for reseting password', async () => {
    const usersTokensCreateSpyOn = jest.spyOn(usersTokensRepository, 'create');

    await usersRepository.create({
      driver_license: '1284223601',
      email: 'vi@hudattik.ws',
      name: 'Gilbert Nash',
      password: 'eb5c06d1-f1da-5bc6-8e4e-aebd3a0a5e5b',
      username: 'test',
    });

    await sendForgottenPasswordEmailUseCase.execute('vi@hudattik.ws');

    expect(usersTokensCreateSpyOn).toHaveBeenCalled();
  });
});
