import { ICreateUserDTO } from '../../dto/ICreateUserDTO';

interface ICreateUserUseCase {
  execute(dto: ICreateUserDTO): Promise<void>
}

export { ICreateUserUseCase };
