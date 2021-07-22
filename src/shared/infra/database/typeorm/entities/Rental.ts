import { Column, Entity, UpdateDateColumn } from 'typeorm';
import { BaseEntitiy } from './BaseEntity';

@Entity('rentals')
class Rental extends BaseEntitiy {
  @Column()
  car_id: string;

  @Column()
  user_id: string;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  @Column()
  expected_return_date: Date;

  @Column()
  total: number;

  @UpdateDateColumn()
  updated_at: Date;
}

export { Rental };
