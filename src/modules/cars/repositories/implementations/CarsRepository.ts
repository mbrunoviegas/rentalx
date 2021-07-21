import { getRepository, Repository } from 'typeorm';
import { ICreateCarRequestDTO } from '@modules/cars/useCases/createCar/dto/ICreateCarRequestDTO';
import { IListAvailableCarsRequestDTO } from '@modules/cars/useCases/listAvailableCars/dto/IListAvailableCarsRequestDTO';
import { Car } from '@shared/infra/database/typeorm/entities/Car';
import { ICarsRepository } from '../ICarsRepository';

class CarsRepository implements ICarsRepository {
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

  async listAllAvailable({ brand, name, category_id }: IListAvailableCarsRequestDTO): Promise<Car[]> {
    const carsQueryBuilder = this.repository.createQueryBuilder('c');

    carsQueryBuilder
      .where('c.available = :available', { available: true });

    if (brand) {
      carsQueryBuilder.andWhere('c.brand = :brand', { brand });
    }

    if (name) {
      carsQueryBuilder.andWhere('c.name = :name', { name });
    }

    if (category_id) {
      carsQueryBuilder.andWhere('c.category_id = :category_id', { category_id });
    }

    const cars = await carsQueryBuilder.getMany();

    return cars;
  }

  async findById(id: string): Promise<Car> {
    return this.repository.findOne(id);
  }
}

export { CarsRepository };
