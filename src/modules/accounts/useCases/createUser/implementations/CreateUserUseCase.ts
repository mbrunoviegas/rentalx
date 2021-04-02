import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../../shared/errors/AppError';
import { ICreateUserDTO } from '../../../dto/ICreateUserDTO';
import { IUserRepository } from '../../../repositories/interfaces/IUserRepository';
import { ICreateUserUseCase } from '../interfaces/ICreateUserUseCase';

@injectable()
class CreateUserUseCase implements ICreateUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

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
    await this.userRepository.create({
      name, username, password, email, driver_license,
    });
  }
}

export { CreateUserUseCase };
