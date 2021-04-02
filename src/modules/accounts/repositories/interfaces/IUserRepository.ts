import { User } from '../../../../shared/database/typeorm/entities/User';
import { ICreateUserDTO } from '../../dto/ICreateUserDTO';

interface IUserRepository {
  create(dto: ICreateUserDTO): Promise<void>;
  findByUsername(username: string): Promise<User>;
  findById(id: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
}

export { IUserRepository };
