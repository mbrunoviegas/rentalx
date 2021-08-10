import { UsersTokens } from '@shared/infra/database/typeorm/entities/UsersTokens';
import { ICreateRefreshToken } from '../dto/ICreateRefreshToken';

interface IUsersTokensRepository {
  create(props: ICreateRefreshToken): Promise<UsersTokens>
}

export { IUsersTokensRepository };
