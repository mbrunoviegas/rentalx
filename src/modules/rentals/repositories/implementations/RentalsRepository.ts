import { getRepository, IsNull, Repository } from 'typeorm';
import { ICreateRental } from '@modules/rentals/dto/ICreateRental';
import { Rental } from '@shared/infra/database/typeorm/entities/Rental';
import { IRentalsRepository } from '../IRentalsRepository';

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }

  async create(props: ICreateRental): Promise<Rental> {
    const rental = this.repository.create(props);
    return this.repository.save(rental);
  }

  async findOpenRentalByCarId(car_id: string): Promise<Rental> {
    return this.repository.findOne({
      where: {
        car_id,
        end_date: null,
      },
    });
  }

  async findOpenRentalByUserId(user_id: string): Promise<Rental> {
    return this.repository.findOne({
      where: {
        user_id,
        end_date: null,
      },
    });
  }

  async findById(id: string): Promise<Rental> {
    return this.repository.findOne(id);
  }

  async findOpenById(id: string): Promise<Rental> {
    return this.repository.findOne(id, {
      where: {
        end_date: IsNull(),
      },
    });
  }
}

export { RentalsRepository };
