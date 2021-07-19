import {
  Column, Entity, JoinColumn, ManyToOne,
} from 'typeorm';
import { BaseEntitiy } from './BaseEntity';
import { Category } from './Category';

@Entity('cars')
export class Car extends BaseEntitiy {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  daily_rate: number;

  @Column()
  license_plate: string;

  @Column()
  fine_amount: number;

  @Column()
  brand: string;

  @ManyToOne(() =>
    Category)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column()
  category_id: string;

  @Column({ default: true })
  available: boolean;
}
