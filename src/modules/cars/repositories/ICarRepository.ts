import { Car } from '@shared/infra/database/typeorm/entities/Car';
import { ICreateCarRequestDTO } from '../useCases/createCar/dto/ICreateCarRequestDTO';
import { IListCarRequestDTO } from '../useCases/listCar/dto/IListCarRequestDTO';

interface ICarRepository {
  create(props: ICreateCarRequestDTO): Promise<Car>;
  findByLicensePlate(license_plate: string): Promise<Car | undefined>;
  listAllAvailable(filterOptions: IListCarRequestDTO): Promise<Car[]>
}

export { ICarRepository };
