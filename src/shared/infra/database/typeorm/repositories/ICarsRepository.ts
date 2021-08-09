import { Car } from '@shared/infra/database/typeorm/entities/Car';
import { ICreateCarRequestDTO } from '../../../../../modules/cars/useCases/createCar/dto/ICreateCarRequestDTO';
import { IListAvailableCarsRequestDTO } from '../../../../../modules/cars/useCases/listAvailableCars/dto/IListAvailableCarsRequestDTO';

interface ICarsRepository {
  create(props: ICreateCarRequestDTO): Promise<Car>;
  findByLicensePlate(license_plate: string): Promise<Car | undefined>;
  listAllAvailable(filterOptions: IListAvailableCarsRequestDTO): Promise<Car[]>
  findById(id: string): Promise<Car>;
  updateStatus(id: string, available: boolean): Promise<void>;
}

export { ICarsRepository };
