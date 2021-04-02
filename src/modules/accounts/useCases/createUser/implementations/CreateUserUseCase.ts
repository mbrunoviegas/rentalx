import { ICreateUserDTO } from '../../../dto/ICreateUserDTO';
import { ICreateUserUseCase } from '../interfaces/ICreateUserUseCase';

class CreateUserUseCase implements ICreateUserUseCase {
  execute({
    name, username, password, email, driver_license,
  }: ICreateUserDTO): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

export { CreateUserUseCase };
