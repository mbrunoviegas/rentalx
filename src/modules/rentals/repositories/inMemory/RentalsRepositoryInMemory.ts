import { v4 as uuid } from 'uuid';
import { ICreateRental } from '@modules/rentals/dto/ICreateRental';
import { Rental } from '@shared/infra/database/typeorm/entities/Rental';
import { IRentalsRepository } from '../IRentalsRepository';

class RentalsRepositoryInMemory implements IRentalsRepository {
  private rentals: Rental[] = [];

  async create(props: ICreateRental): Promise<Rental> {
    const rental = new Rental();

    Object.assign(rental, {
      ...props,
      id: uuid(),
      start_date: new Date(),
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.rentals.push(rental);

    return rental;
  }

  async findOpenRentalByCarId(car_id: string): Promise<Rental> {
    return this.rentals.find((rental) =>
      rental.car_id === car_id && !rental.end_date);
  }

  async findOpenRentalByUserId(user_id: string): Promise<Rental> {
    return this.rentals.find((rental) =>
      rental.user_id === user_id && !rental.end_date);
  }

  async findById(id: string): Promise<Rental> {
    return this.rentals.find((rental) =>
      rental.id === id);
  }
}

export { RentalsRepositoryInMemory };
