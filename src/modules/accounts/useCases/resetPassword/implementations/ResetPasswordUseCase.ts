import { inject, injectable } from 'tsyringe';
import { AppError } from '@shared/core/errors/AppError';
import { IUseCase } from '@shared/core/IUseCase';
import { ICrypt } from '@shared/core/providers/interfaces/ICrypt';
import { IUserRepository } from '@shared/infra/database/typeorm/repositories/IUserRepository';
import { IUsersTokensRepository } from '@shared/infra/database/typeorm/repositories/IUsersTokensRepository';
import { IRequestResetPassword } from '../dto/IRequestResetPassword';

@injectable()
class ResetPasswordUseCase implements IUseCase<IRequestResetPassword, void> {
  constructor(
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('CryptProvider')
    private cryptProvider: ICrypt,
  ) {}

  async execute({ password, token }: IRequestResetPassword): Promise<void> {
    const userTokens = await this.usersTokensRepository.findByToken(token);

    if (!userTokens) {
      throw new AppError('Invalid token!');
    }

    const user = await this.userRepository.findById(userTokens.user_id);

    if (!user) {
      throw new AppError('User does not exist');
    }

    user.password = await this.cryptProvider.encrypt(password);

    await this.userRepository.create(user);
    await this.usersTokensRepository.deleteById(userTokens.id);
  }
}

export { ResetPasswordUseCase };
