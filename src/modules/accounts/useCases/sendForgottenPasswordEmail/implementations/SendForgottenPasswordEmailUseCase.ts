import { resolve } from 'path';
import { inject, injectable } from 'tsyringe';
import { v4 as uuid } from 'uuid';
import { AppError } from '@shared/core/errors/AppError';
import { IUseCase } from '@shared/core/IUseCase';
import { IDateProvider } from '@shared/core/providers/interfaces/IDateProvider';
import { IMailProvider } from '@shared/core/providers/interfaces/IMailProvider';
import { IUserRepository } from '@shared/infra/database/typeorm/repositories/IUserRepository';
import { IUsersTokensRepository } from '@shared/infra/database/typeorm/repositories/IUsersTokensRepository';

@injectable()
class SendForgottenPasswordEmailUseCase implements IUseCase<string, void> {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUserRepository,
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider,
    @inject('EtherealMailProvider')
    private mailProvider: IMailProvider,
  ) { }

  async execute(email: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exist');
    }

    const templatePath = resolve(
      __dirname,
      '..',
      '..',
      '..',
      'views',
      'email',
      'forgottenPassword.hbs',
    );

    const EXPIRES_HOURS_RESET_TOKEN = 1;
    const resetPasswordToken = uuid();
    const expiresDate = this.dateProvider.addHours(EXPIRES_HOURS_RESET_TOKEN);

    await this.usersTokensRepository.create({
      refresh_token: resetPasswordToken,
      user_id: user.id,
      expires_date: expiresDate,
    });

    const variables = {
      name: user.name,
      link: `${process.env.FORFOT_PASSWORD_LINK_DEV}${resetPasswordToken}`,
    };

    await this.mailProvider.sendMail(
      email,
      'Recuperação de Senha',
      variables,
      templatePath,
    );
  }
}

export { SendForgottenPasswordEmailUseCase };
