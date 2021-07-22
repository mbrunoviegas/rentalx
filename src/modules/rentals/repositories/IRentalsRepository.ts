import { Rental } from '@shared/infra/database/typeorm/entities/Rental';
import { ICreateRental } from '../dto/ICreateRental';

interface IRentalsRepository {
  create(props: ICreateRental): Promise<Rental>;
  findOpenRentalByCarId(car_id: string): Promise<Rental>;
  findOpenRentalByUserId(user_id: string): Promise<Rental>;
}

export { IRentalsRepository };
