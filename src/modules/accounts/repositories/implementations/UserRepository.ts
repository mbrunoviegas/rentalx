import { ICreateUserDTO } from '../../dto/ICreateUserDTO';
import { IUserRepository } from '../interfaces/IUserRepository';

class UserRepository implements IUserRepository {
  create(dto: ICreateUserDTO): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

export { UserRepository };
