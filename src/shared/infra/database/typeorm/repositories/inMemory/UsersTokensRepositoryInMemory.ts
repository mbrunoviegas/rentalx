import { v4 as uuid } from 'uuid';
import { ICreateRefreshToken } from '@modules/accounts/dto/ICreateRefreshToken';
import { UsersTokens } from '../../entities/UsersTokens';
import { IUsersTokensRepository } from '../IUsersTokensRepository';

class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
  private usersTokens: UsersTokens[] = [];

  async create(props: ICreateRefreshToken): Promise<UsersTokens> {
    const userToken = new UsersTokens();

    Object.assign(userToken, {
      ...props,
      id: uuid(),
      created_at: new Date(),
    });

    this.usersTokens.push(userToken);

    return userToken;
  }

  async findTokenByUserIdAndToken(user_id: string, token: string): Promise<UsersTokens> {
    return this.usersTokens.find((userToken) =>
      userToken.user_id === user_id && userToken.refresh_token === token);
  }

  async deleteById(id: string): Promise<void> {
    const index = this.usersTokens.findIndex((userToken) =>
      userToken.id === id);
    this.usersTokens.splice(index);
  }

  async findByToken(refresh_token: string): Promise<UsersTokens> {
    return this.usersTokens.find((userToken) =>
      userToken.refresh_token === refresh_token);
  }
}

export { UsersTokensRepositoryInMemory };
