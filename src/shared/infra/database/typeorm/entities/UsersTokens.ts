import { Column, Entity } from 'typeorm';
import { BaseEntity } from './BaseEntity';

@Entity('users_tokens')
class UsersTokens extends BaseEntity {
  @Column()
  user_id: string;

  @Column()
  refresh_token: string;

  @Column()
  expires_date: Date;
}

export { UsersTokens };
