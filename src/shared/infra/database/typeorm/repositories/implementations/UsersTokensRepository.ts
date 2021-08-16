import { getRepository, Repository } from 'typeorm';
import { ICreateRefreshToken } from '@modules/accounts/dto/ICreateRefreshToken';
import { UsersTokens } from '@shared/infra/database/typeorm/entities/UsersTokens';
import { IUsersTokensRepository } from '../IUsersTokensRepository';

class UsersTokensRepository implements IUsersTokensRepository {
  private repository: Repository<UsersTokens>;

  constructor(
  ) {
    this.repository = getRepository(UsersTokens);
  }

  async create({ expires_date, refresh_token, user_id }: ICreateRefreshToken): Promise<UsersTokens> {
    const userToken = new UsersTokens();

    Object.assign(userToken, {
      expires_date,
      refresh_token,
      user_id,
    });

    return this.repository.save(userToken);
  }

  async findTokenByUserIdAndToken(user_id: string, token: string): Promise<UsersTokens> {
    return this.repository.findOne({
      where: {
        user_id,
        refresh_token: token,
      },
    });
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async findByToken(refresh_token: string): Promise<UsersTokens> {
    return this.repository.findOne({
      where: {
        refresh_token,
      },
    });
  }
}

export { UsersTokensRepository };
