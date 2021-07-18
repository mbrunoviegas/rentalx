import { Car } from '@shared/infra/database/typeorm/entities/Car';
import { ICreateCarRequestDTO } from '../useCases/createCar/dto/ICreateCarRequestDTO';

interface ICarRepository {
  create(props: ICreateCarRequestDTO): Promise<Car>;
  findByLicensePlate(license_plate: string): Promise<Car | undefined>;
}

export { ICarRepository };
