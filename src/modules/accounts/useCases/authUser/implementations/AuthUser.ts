import { IResponseAuth } from '../dto/IResponseAuth';
import { IAuthUser } from '../interfaces/IAuthUser';

class AuthUser implements IAuthUser {
  execute(username: string, password: string): Promise<IResponseAuth> {
    throw new Error('as');
  }
}

export { AuthUser };
