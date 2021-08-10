import {
  Column, Entity,
} from 'typeorm';
import { BaseEntity } from './BaseEntity';

@Entity('users')
class User extends BaseEntity {
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

  @Column({
    nullable: true,
  })
  avatar: string;
}

export { User };
