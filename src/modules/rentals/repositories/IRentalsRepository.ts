import { Rental } from '@shared/infra/database/typeorm/entities/Rental';

interface IRentalsRepository {
  findOpenRentalByCarId(car_id: string): Promise<Rental>
  findOpenRentalByUserId(user_id: string): Promise<Rental>
}

export { IRentalsRepository };
