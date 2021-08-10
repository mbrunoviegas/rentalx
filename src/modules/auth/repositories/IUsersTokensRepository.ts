import { UsersTokens } from '@shared/infra/database/typeorm/entities/UsersTokens';
import { ICreateRefreshToken } from '../../accounts/dto/ICreateRefreshToken';

interface IUsersTokensRepository {
  create(props: ICreateRefreshToken): Promise<UsersTokens>;
  findTokenByUserIdAndToken(user_id: string, token: string): Promise<UsersTokens>;
  deleteById(id: string): Promise<void>;
}

export { IUsersTokensRepository };
