import { inject, injectable } from 'tsyringe';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { Rental } from '@shared/infra/database/typeorm/entities/Rental';

@injectable()
class ListRentalsByUserUseCase implements IUseCase<string, Rental[]> {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,
  ) {}

  async execute(user_id: string): Promise<Rental[]> {
    return this.rentalsRepository.findAllByUserId(user_id);
  }
}

export { ListRentalsByUserUseCase };
