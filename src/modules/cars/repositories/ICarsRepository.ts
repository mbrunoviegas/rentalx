import { Car } from '@shared/infra/database/typeorm/entities/Car';
import { ICreateCarRequestDTO } from '../useCases/createCar/dto/ICreateCarRequestDTO';
import { IListAvailableCarsRequestDTO } from '../useCases/listAvailableCars/dto/IListAvailableCarsRequestDTO';

interface ICarsRepository {
  create(props: ICreateCarRequestDTO): Promise<Car>;
  findByLicensePlate(license_plate: string): Promise<Car | undefined>;
  listAllAvailable(filterOptions: IListAvailableCarsRequestDTO): Promise<Car[]>
}

export { ICarsRepository };
