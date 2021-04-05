import { inject, injectable } from 'tsyringe';
import { User } from '../../../../../shared/database/typeorm/entities/User';
import { AppError } from '../../../../../shared/errors/AppError';
import { IAuth } from '../../../../../shared/providers/interfaces/IAuth';
import { ICrypt } from '../../../../../shared/providers/interfaces/ICrypt';
import { UserRepository } from '../../../repositories/implementations/UserRepository';
import { IRequestAuth } from '../dto/IRequestAuth';
import { IResponseAuth } from '../dto/IResponseAuth';
import { IAuthUser } from '../interfaces/IAuthUser';

@injectable()
class AuthUserUseCase implements IAuthUser {
  constructor(
    @inject('UserRepository')
    private userRepository: UserRepository,
    @inject('CryptProvider')
    private cryptProvider: ICrypt,
    @inject('AuthProvider')
    private authProvider: IAuth,
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

  async execute({ email, password }: IRequestAuth): Promise<IResponseAuth> {
    const userAlreadyExists = await this.userRepository.findByEmail(email);
    if (!userAlreadyExists) {
      throw new AppError('Email or password incorrect!');
    }

    const isValidPassword = await this.cryptProvider.compare(password, userAlreadyExists.password);
    if (!isValidPassword) {
      throw new AppError('Email or password incorrect!');
    }

    const accesToken = this.authProvider.generateToken(userAlreadyExists.id);

    const response = this.buildResponse(userAlreadyExists, accesToken);

    return response;
  }
}

export { AuthUserUseCase };
