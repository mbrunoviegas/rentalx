import { getRepository, Repository } from 'typeorm';
import { User } from '../../../../shared/database/typeorm/entities/User';
import { ICreateUserDTO } from '../../dto/ICreateUserDTO';
import { IUserRepository } from '../interfaces/IUserRepository';

class UserRepository implements IUserRepository {
  private repository: Repository<User>

  constructor() {
    this.repository = getRepository(User);
  }

  async create({
    name, username, password, email, driver_license,
  }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name, username, password, email, driver_license,
    });

    await this.repository.save(user);
  }

  async findByUsername(username: string): Promise<User> {
    const user = await this.repository.findOne({ username });

    return user;
  }
}

export { UserRepository };
