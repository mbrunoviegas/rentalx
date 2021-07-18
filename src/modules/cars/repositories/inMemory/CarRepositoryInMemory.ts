import { ICreateCarRequestDTO } from '@modules/cars/useCases/createCar/dto/ICreateCarRequestDTO';
import { Car } from '@shared/infra/database/typeorm/entities/Car';
import { ICarRepository } from '../ICarRepository';

class CarRepositoryInMemory implements ICarRepository {
  private cars: Car[] = [];

  async create(props: ICreateCarRequestDTO): Promise<Car> {
    const car = new Car();
    Object.assign(car, {
      ...props,
    });
    this.cars.push(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car | undefined> {
    return this.cars.find((car) =>
      car.license_plate === license_plate);
  }
}

export { CarRepositoryInMemory };
