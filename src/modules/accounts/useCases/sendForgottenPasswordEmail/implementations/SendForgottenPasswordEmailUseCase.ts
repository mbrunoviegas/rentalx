import { inject, injectable } from 'tsyringe';
import { v4 as uuid } from 'uuid';
import { IUsersTokensRepository } from '@modules/auth/repositories/IUsersTokensRepository';
import { AppError } from '@shared/core/errors/AppError';
import { IUseCase } from '@shared/core/IUseCase';
import { IDateProvider } from '@shared/core/providers/interfaces/IDateProvider';
import { IMailProvider } from '@shared/core/providers/interfaces/IMailProvider';
import { IUserRepository } from '@shared/infra/database/typeorm/repositories/IUserRepository';

@injectable()
class SendForgottenPasswordEmailUseCase implements IUseCase<string, void> {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUserRepository,
    @inject('UsersTokensRepository')
    private usersTokens: IUsersTokensRepository,
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

    const EXPIRES_HOURS_RESET_TOKEN = 1;
    const resetPasswordToken = uuid();
    const expiresDate = this.dateProvider.addHours(EXPIRES_HOURS_RESET_TOKEN);

    await this.usersTokens.create({
      refresh_token: resetPasswordToken,
      user_id: user.id,
      expires_date: expiresDate,
    });

    await this.mailProvider.sendMail(
      email,
      'Recuperação de Senha',
      `O link para o reset é ${resetPasswordToken}`,
    );
  }
}

export { SendForgottenPasswordEmailUseCase };
