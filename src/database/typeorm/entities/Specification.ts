import { Entity, Column } from 'typeorm';
import { BaseEntitiy } from './BaseEntity';

@Entity('specifications')
class Specification extends BaseEntitiy {
  @Column()
  name: string;
  @Column()
  description: string;
}

export { Specification };
