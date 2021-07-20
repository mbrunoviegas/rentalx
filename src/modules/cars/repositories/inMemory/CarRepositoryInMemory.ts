import { v4 as uuid } from 'uuid';
import { ICreateCarRequestDTO } from '@modules/cars/useCases/createCar/dto/ICreateCarRequestDTO';
import { IListCarRequestDTO } from '@modules/cars/useCases/listCar/dto/IListCarRequestDTO';
import { Car } from '@shared/infra/database/typeorm/entities/Car';
import { ICarRepository } from '../ICarRepository';

class CarRepositoryInMemory implements ICarRepository {
  private cars: Car[] = [];

  async create(props: ICreateCarRequestDTO): Promise<Car> {
    const car = new Car();
    Object.assign(car, {
      ...props,
      id: uuid(),
      available: true,
    });
    this.cars.push(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car | undefined> {
    return this.cars.find((car) =>
      car.license_plate === license_plate);
  }

  async listAllAvailable({ brand, category_id, name }: IListCarRequestDTO): Promise<Car[]> {
    let cars = this.cars.filter((car) =>
      car.available);

    if (brand) {
      cars = cars.filter((car) =>
        car.brand === brand);
    }

    if (name) {
      cars = cars.filter((car) =>
        car.name === name);
    }

    if (category_id) {
      cars = cars.filter((car) =>
        car.category_id === category_id);
    }

    return cars;
  }
}

export { CarRepositoryInMemory };
