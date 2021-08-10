import { Entity, Column } from 'typeorm';
import { BaseEntity } from './BaseEntity';

@Entity('specifications')
class Specification extends BaseEntity {
  @Column()
  name: string;
  @Column()
  description: string;
}

export { Specification };
