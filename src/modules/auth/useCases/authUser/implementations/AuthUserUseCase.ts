import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '@shared/infra/database/typeorm/repositories/IUserRepository';
import { IUsersTokensRepository } from '@modules/auth/repositories/IUsersTokensRepository';
import { IRequestAuth } from '@modules/auth/useCases/authUser/dto/IRequestAuth';
import { IResponseAuth } from '@modules/auth/useCases/authUser/dto/IResponseAuth';
import auth from '@shared/config/auth';
import { AppError } from '@shared/core/errors/AppError';
import { IUseCase } from '@shared/core/IUseCase';
import { JwtProvider } from '@shared/core/providers/implementations/JwtProvider';
import { ICrypt } from '@shared/core/providers/interfaces/ICrypt';
import { IDateProvider } from '@shared/core/providers/interfaces/IDateProvider';
import { User } from '@shared/infra/database/typeorm/entities/User';

@injectable()
class AuthUserUseCase implements IUseCase<IRequestAuth, IResponseAuth> {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('CryptProvider')
    private cryptProvider: ICrypt,
    @inject('DateProvider')
    private dateProvider: IDateProvider,
  ) { }

  private buildResponse(
    { name, username }: User,
    accessToken: string,
    refreshToken: string,
  ): IResponseAuth {
    return {
      user: {
        name,
        username,
      },
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  private async findUser(email: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new AppError('Email or password incorrect!');
    }
    return user;
  }

  private async validateUserPassword(inputtedPassword: string, userPassword: string): Promise<void> {
    const isValidPassword = await this.cryptProvider.compare(inputtedPassword, userPassword);
    if (!isValidPassword) {
      throw new AppError('Email or password incorrect!');
    }
  }

  async execute({ email, password }: IRequestAuth): Promise<IResponseAuth> {
    const user = await this.findUser(email);
    await this.validateUserPassword(password, user.password);

    const accesToken = JwtProvider.generateToken(
      user.id,
      auth.accessTokenSecret,
      auth.accessTokenExpiresIn,
    );

    const refresh_token = JwtProvider.generateToken(
      user.id,
      auth.resfreshTokenSecret,
      auth.refreshTokenExpiresIn,
      { email },
    );

    const expiresDate = this.dateProvider.addDays(auth.refreshTokenExpirationDays);

    await this.usersTokensRepository.create({
      expires_date: expiresDate,
      refresh_token,
      user_id: user.id,
    });

    const response = this.buildResponse(user, accesToken, refresh_token);

    return response;
  }
}

export { AuthUserUseCase };
