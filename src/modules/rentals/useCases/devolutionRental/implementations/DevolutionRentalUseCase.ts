import { inject, injectable } from 'tsyringe';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { AppError } from '@shared/core/errors/AppError';
import { IUseCase } from '@shared/core/IUseCase';
import { IDateProvider } from '@shared/core/providers/interfaces/IDateProvider';
import { Rental } from '@shared/infra/database/typeorm/entities/Rental';
import { ICarsRepository } from '@shared/infra/database/typeorm/repositories/ICarsRepository';
import { IDevolutionRentalRequestDTO } from '../dto/IDevolutionRentalRequestDTO';

@injectable()
class DevolutionRentalUseCase implements IUseCase<IDevolutionRentalRequestDTO, Rental> {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,
    @inject('CarsRepository')
    private carsReposiroy: ICarsRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider,
  ) { }

  async execute({ rental_id }: IDevolutionRentalRequestDTO): Promise<Rental> {
    const minimum_daily = 1;
    let total = 0;
    const rental = await this.rentalsRepository.findOpenById(rental_id);

    if (!rental) {
      throw new AppError('There is no open rental with this identifier');
    }

    const dateNow = this.dateProvider.dateNow();
    let daily = this.dateProvider.compareTwoDatesByHour(rental.start_date, dateNow);

    if (daily <= 0) {
      daily = minimum_daily;
    }

    const delay = this.dateProvider.compareTwoDatesByDays(
      dateNow,
      rental.expected_return_date,
    );
    const car = await this.carsReposiroy.findById(rental.car_id);

    if (delay > 0) {
      total = delay * car.fine_amount;
    }

    total += daily * car.daily_rate;

    rental.end_date = this.dateProvider.dateNow();
    rental.total = total;

    await this.rentalsRepository.create(rental);
    await this.carsReposiroy.updateStatus(car.id, true);

    return rental;
  }
}

export { DevolutionRentalUseCase };
