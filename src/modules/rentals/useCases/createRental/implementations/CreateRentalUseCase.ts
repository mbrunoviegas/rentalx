import { inject, injectable } from 'tsyringe';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { AppError } from '@shared/core/errors/AppError';
import { IDateProvider } from '@shared/core/providers/interfaces/IDateProvider';
import { Rental } from '@shared/infra/database/typeorm/entities/Rental';
import { ICreateRentalRequestDTO } from '../dto/ICreateRentalRequestDTO';

@injectable()
class CreateRentalUseCase implements IUseCase<ICreateRentalRequestDTO, Rental> {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider,
  ) {}

  async execute({
    car_id,
    user_id,
    expected_return_date,
  }: ICreateRentalRequestDTO): Promise<Rental> {
    const minimumRentalTimeInHours = 24;

    const rentalOpenToCar = await this.rentalsRepository.findOpenRentalByCarId(car_id);

    if (rentalOpenToCar) {
      throw new AppError("There's a rental open for this car!");
    }

    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUserId(user_id);

    if (rentalOpenToUser) {
      throw new AppError("There's a rental open for this user!");
    }

    const compareResult = this.dateProvider.compareTwoDatesByHour(expected_return_date);

    if (compareResult < minimumRentalTimeInHours) {
      throw new AppError('The minimum limit for a rental is 24 hours');
    }

    return this.rentalsRepository.create({ car_id, user_id, expected_return_date });
  }
}

export { CreateRentalUseCase };
