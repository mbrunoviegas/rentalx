import {
  Column, Entity,
} from 'typeorm';
import { BaseEntitiy } from './BaseEntity';

@Entity('users')
class User extends BaseEntitiy {
  @Column()
  name: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  driver_license: string;

  @Column()
  isAdmin: boolean;

  @Column()
  avatar: string;
}

export { User };
