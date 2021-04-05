import { IRequestAuth } from '../dto/IRequestAuth';
import { IResponseAuth } from '../dto/IResponseAuth';

interface IAuthUser {
  execute({ email, password }: IRequestAuth): Promise<IResponseAuth>;
}

export { IAuthUser };
