import { Rental } from '@shared/infra/database/typeorm/entities/Rental';
import { ICreateRental } from '../dto/ICreateRental';

interface IRentalsRepository {
  create(props: ICreateRental): Promise<Rental>;
  findOpenRentalByCarId(car_id: string): Promise<Rental>;
  findOpenRentalByUserId(user_id: string): Promise<Rental>;
  findById(id: string): Promise<Rental>;
  findOpenById(id: string): Promise<Rental>;
  findAllByUserId(user_id: string): Promise<Rental[]>;
}

export { IRentalsRepository };
