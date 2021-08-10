import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '@shared/infra/database/typeorm/repositories/IUserRepository';
import { ICreateUserDTO } from '@modules/accounts/useCases/createUser/dto/ICreateUserDTO';
import { AppError } from '@shared/core/errors/AppError';
import { IUseCase } from '@shared/core/IUseCase';
import { ICrypt } from '@shared/core/providers/interfaces/ICrypt';

@injectable()
class CreateUserUseCase implements IUseCase<ICreateUserDTO, void> {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('CryptProvider')
    private crypt: ICrypt,
  ) { }

  private async validateUser(username: string, email: string): Promise<void> {
    let user = await this.userRepository.findByUsername(username);
    if (user) {
      throw new AppError('Username already exists');
    }
    user = await this.userRepository.findByEmail(email);
    if (user) {
      throw new AppError('Email already exists');
    }
  }

  private async encryptPassword(decryptedPassword: string): Promise<string> {
    return this.crypt.encrypt(decryptedPassword);
  }

  private async createUser(
    name: string, username: string, password: string,
    email: string, driver_license: string,
  ): Promise<void> {
    this.userRepository.create({
      name,
      username,
      password,
      email,
      driver_license,
    });
  }

  async execute({
    name, username, password, email, driver_license,
  }: ICreateUserDTO): Promise<void> {
    await this.validateUser(username, email);
    const encryptedPassword = await this.encryptPassword(password);
    await this.createUser(name, username, encryptedPassword, email, driver_license);
  }
}

export { CreateUserUseCase };
