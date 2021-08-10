import { Column, Entity } from 'typeorm';
import { BaseEntity } from './BaseEntity';

@Entity('cars_image')
class CarImage extends BaseEntity {
  @Column()
  car_id: string;

  @Column()
  image_name: string;
}

export { CarImage };
