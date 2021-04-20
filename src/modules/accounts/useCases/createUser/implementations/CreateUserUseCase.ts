import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../../shared/errors/AppError';
import { ICrypt } from '../../../../../shared/providers/interfaces/ICrypt';
import { IUserRepository } from '../../../repositories/interfaces/IUserRepository';
import { ICreateUserDTO } from '../dto/ICreateUserDTO';

@injectable()
class CreateUserUseCase implements IUseCase<ICreateUserDTO, void> {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('CryptProvider')
    private crypt: ICrypt,
  ) { }

  async execute({
    name, username, password, email, driver_license,
  }: ICreateUserDTO): Promise<void> {
    let user = await this.userRepository.findByUsername(username);
    if (user) {
      throw new AppError('Username already exists');
    }
    user = await this.userRepository.findByEmail(email);
    if (user) {
      throw new AppError('Email already exists');
    }

    const encryptedPassword = await this.crypt.encrypt(password);

    await this.userRepository.create({
      name,
      username,
      password: encryptedPassword,
      email,
      driver_license,
    });
  }
}

export { CreateUserUseCase };
