import { CarImage } from '@shared/infra/database/typeorm/entities/CarImage';

interface ICarsImageRepository {
  create(car_id: string, image_name: string): Promise<CarImage>;
  findByCarId(car_id: string): Promise<CarImage[]>;
  deleteByCarId(car_id: string): Promise<void>;
}

export { ICarsImageRepository };
