import { ICreateUserDTO } from '@modules/accounts/useCases/createUser/dto/ICreateUserDTO';
import { User } from '@shared/infra/database/typeorm/entities/User';

interface IUserRepository {
  create(dto: ICreateUserDTO): Promise<void>;
  findByUsername(username: string): Promise<User>;
  findById(id: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
}

export { IUserRepository };
