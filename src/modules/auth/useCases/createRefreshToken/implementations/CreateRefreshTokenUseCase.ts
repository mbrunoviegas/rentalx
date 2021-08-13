import { inject, injectable } from 'tsyringe';
import { IUsersTokensRepository } from '@shared/infra/database/typeorm/repositories/IUsersTokensRepository';
import auth from '@shared/config/auth';
import { AppError } from '@shared/core/errors/AppError';
import { IUseCase } from '@shared/core/IUseCase';
import { JwtProvider } from '@shared/core/providers/implementations/JwtProvider';
import { IDateProvider } from '@shared/core/providers/interfaces/IDateProvider';

interface IPayload {
  sub: string;
  email: string;
}

@injectable()
class CreateRefreshTokenUseCase implements IUseCase<string, string> {
  constructor(
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider,
  ) {}

  async execute(token: string): Promise<string> {
    const { sub: user_id, email } = JwtProvider.verify(token, auth.resfreshTokenSecret) as IPayload;
    const userToken = await this.usersTokensRepository.findTokenByUserIdAndToken(user_id, token);

    if (!userToken) {
      throw new AppError('Invalid token');
    }

    await this.usersTokensRepository.deleteById(userToken.id);

    const newRefreshToken = JwtProvider.generateToken(
      user_id,
      auth.resfreshTokenSecret,
      auth.refreshTokenExpiresIn,
      { email },
    );

    const expiresDate = this.dateProvider.addDays(auth.refreshTokenExpirationDays);

    await this.usersTokensRepository.create({
      user_id,
      refresh_token: newRefreshToken,
      expires_date: expiresDate,
    });

    return newRefreshToken;
  }
}

export { CreateRefreshTokenUseCase };
