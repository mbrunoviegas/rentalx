import {
  Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne,
} from 'typeorm';
import { BaseEntitiy } from './BaseEntity';
import { Category } from './Category';
import { Specification } from './Specification';

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

  @ManyToMany(() =>
    Specification)
  @JoinTable({
    name: 'specifications_cars',
    joinColumns: [{ name: 'car_id' }],
    inverseJoinColumns: [{ name: 'specification_id' }],
  })
  specifications: Specification[];

  @Column()
  category_id: string;

  @Column({ default: true })
  available: boolean;
}
