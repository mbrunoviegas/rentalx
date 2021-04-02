import { ICreateUserDTO } from '../../dto/ICreateUserDTO';

interface IUserRepository {
  create(dto: ICreateUserDTO): Promise<void>
}

export { IUserRepository };
