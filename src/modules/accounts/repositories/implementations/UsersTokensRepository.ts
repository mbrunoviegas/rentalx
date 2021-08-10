import { injectable } from 'tsyringe';
import { getRepository, Repository } from 'typeorm';
import { ICreateRefreshToken } from '@modules/accounts/dto/ICreateRefreshToken';
import { UsersTokens } from '@shared/infra/database/typeorm/entities/UsersTokens';
import { IUsersTokensRepository } from '../IUseusTokensRepository';

@injectable()
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
}

export { UsersTokensRepository };
