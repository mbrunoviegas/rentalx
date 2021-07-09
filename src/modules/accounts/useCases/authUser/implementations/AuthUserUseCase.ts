import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '@modules/accounts/repositories/interfaces/IUserRepository';
import { IRequestAuth } from '@modules/accounts/useCases/authUser/dto/IRequestAuth';
import { IResponseAuth } from '@modules/accounts/useCases/authUser/dto/IResponseAuth';
import { User } from '@shared/database/typeorm/entities/User';
import { AppError } from '@shared/errors/AppError';
import { AuthProvider } from '@shared/providers/implementations/AuthProvider';
import { ICrypt } from '@shared/providers/interfaces/ICrypt';

@injectable()
class AuthUserUseCase implements IUseCase<IRequestAuth, IResponseAuth> {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('CryptProvider')
    private cryptProvider: ICrypt,
  ) { }

  private buildResponse(user: User, accessToken: string): IResponseAuth {
    return {
      user: {
        name: user.name,
        username: user.username,
      },
      access_token: accessToken,
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
    const accesToken = AuthProvider.generateToken(user.id);
    const response = this.buildResponse(user, accesToken);

    return response;
  }
}

export { AuthUserUseCase };
