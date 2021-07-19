import { getRepository, Repository } from 'typeorm';
import { ICreateCarRequestDTO } from '@modules/cars/useCases/createCar/dto/ICreateCarRequestDTO';
import { Car } from '@shared/infra/database/typeorm/entities/Car';
import { ICarRepository } from '../ICarRepository';

class CarRepository implements ICarRepository {
  private repository: Repository<Car>;

  constructor(
  ) {
    this.repository = getRepository(Car);
  }

  async create(props: ICreateCarRequestDTO): Promise<Car> {
    const car = this.repository.create(props);
    return this.repository.save(car);
  }

  async findByLicensePlate(license_plate: string): Promise<Car | undefined> {
    return this.repository.findOne({ where: { license_plate } });
  }
}

export { CarRepository };
