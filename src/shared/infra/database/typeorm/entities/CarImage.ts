import { Column, Entity } from 'typeorm';
import { BaseEntitiy } from './BaseEntity';

@Entity('cars_image')
class CarImage extends BaseEntitiy {
  @Column()
  car_id: string;

  @Column()
  image_name: string;
}

export { CarImage };
