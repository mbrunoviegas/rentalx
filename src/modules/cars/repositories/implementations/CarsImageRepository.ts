import { getRepository, Repository } from 'typeorm';
import { CarImage } from '@shared/infra/database/typeorm/entities/CarImage';
import { ICarsImageRepository } from '../ICarsImageRepository';

class CarsImageRepository implements ICarsImageRepository {
  private repository: Repository<CarImage>

  constructor() {
    this.repository = getRepository(CarImage);
  }

  async create(car_id: string, image_name: string): Promise<CarImage> {
    const carImage = this.repository.create({ car_id, image_name });

    return this.repository.save(carImage);
  }

  async findByCarId(car_id: string): Promise<CarImage[]> {
    return this.repository.find({
      where: {
        car_id,
      },
    });
  }

  async deleteByCarId(car_id: string): Promise<void> {
    await this.repository.delete({
      car_id,
    });
  }
}

export { CarsImageRepository };
