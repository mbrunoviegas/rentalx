import {
  Column, Entity, JoinColumn, ManyToOne, UpdateDateColumn,
} from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { Car } from './Car';

@Entity('rentals')
class Rental extends BaseEntity {
  @ManyToOne(() =>
    Car)
  @JoinColumn({ name: 'car_id' })
  car: Car;

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
