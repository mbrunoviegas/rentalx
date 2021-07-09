import {
  Column, Entity,
} from 'typeorm';
import { BaseEntitiy } from './BaseEntity';

@Entity('categories')
class Category extends BaseEntitiy {
  @Column()
  name: string;
  @Column()
  description: string;
}

export { Category };
