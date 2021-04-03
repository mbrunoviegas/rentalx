import { IResponseAuth } from '../dto/IResponseAuth';

interface IAuthUser {
  execute(username: string, password: string): Promise<IResponseAuth>;
}

export { IAuthUser };
