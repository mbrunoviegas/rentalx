import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { AppError } from '@shared/core/errors/AppError';
import { ICreateRentalRequestDTO } from '../dto/ICreateRentalRequestDTO';

class CreateRentalUseCase implements IUseCase<ICreateRentalRequestDTO, void> {
  constructor(
    private rentalsRepository: IRentalsRepository,
  ) {}

  async execute({
    car_id,
    user_id,
    expected_return_date,
  }: ICreateRentalRequestDTO): Promise<void> {
    const rentalOpenToCar = await this.rentalsRepository.findOpenRentalByCarId(car_id);

    if (rentalOpenToCar) {
      throw new AppError("There's a rental open for this car!");
    }

    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUserId(user_id);

    if (rentalOpenToUser) {
      throw new AppError("There's a rental open for this user!");
    }
  }
}

export { CreateRentalUseCase };
