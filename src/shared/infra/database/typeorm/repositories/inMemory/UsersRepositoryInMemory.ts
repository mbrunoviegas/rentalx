import { v4 as uuid } from 'uuid';
import { IUserRepository } from '@shared/infra/database/typeorm/repositories/IUserRepository';
import { ICreateUserDTO } from '@modules/accounts/useCases/createUser/dto/ICreateUserDTO';
import { User } from '@shared/infra/database/typeorm/entities/User';

export class UserRespositoryInMemory implements IUserRepository {
  private users: User[] = [];

  async create({
    name, username, password, email, driver_license,
  }: ICreateUserDTO): Promise<void> {
    const user = new User();
    Object.assign(user, {
      name, username, password, email, driver_license, id: uuid(),
    });

    this.users.push(user);
  }

  async findByUsername(username: string): Promise<User> {
    return this.users.find((user) =>
      user.username === username);
  }

  async findById(id: string): Promise<User> {
    return this.users.find((user) =>
      user.id === id);
  }

  async findByEmail(email: string): Promise<User> {
    return this.users.find((user) =>
      user.email === email);
  }
}
