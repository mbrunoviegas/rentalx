import dayjs from 'dayjs';
import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/inMemory/RentalsRepositoryInMemory';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { AppError } from '@shared/core/errors/AppError';
import { DateProvider } from '@shared/core/providers/implementations/DateProvider';
import { IDateProvider } from '@shared/core/providers/interfaces/IDateProvider';
import { Car } from '@shared/infra/database/typeorm/entities/Car';
import { ICarsRepository } from '@shared/infra/database/typeorm/repositories/ICarsRepository';
import { CarsRepositoryInMemory } from '@shared/infra/database/typeorm/repositories/inMemory/CarsRepositoryInMemory';
import { CreateRentalUseCase } from '../implementations/CreateRentalUseCase';

describe('Create Rental Use Case', () => {
  const dateWithOneDayAdded = dayjs().add(1, 'day').toDate();
  let createRentalUseCase: CreateRentalUseCase;
  let rentalsRepository: IRentalsRepository;
  let carsRepository: ICarsRepository;
  let dateProvider: IDateProvider;
  let car: Car;

  beforeEach(async () => {
    rentalsRepository = new RentalsRepositoryInMemory();
    carsRepository = new CarsRepositoryInMemory();
    dateProvider = new DateProvider();
    createRentalUseCase = new CreateRentalUseCase(rentalsRepository, carsRepository, dateProvider);
    car = await carsRepository.create({
      name: 'Car Test',
      license_plate: 'TST1234',
      fine_amount: 10.0,
      description: 'Description test',
      daily_rate: 100.0,
      category_id: '12345',
      brand: 'Test',
    });
  });

  it('Should be able to create a new rental', async () => {
    const car = await carsRepository.create({
      name: 'Car Test',
      license_plate: 'TST1234',
      fine_amount: 10.0,
      description: 'Description Test',
      daily_rate: 100.00,
      category_id: '12345',
      brand: 'Test',
    });

    const createSpyOn = jest.spyOn(rentalsRepository, 'create');
    const rental = await createRentalUseCase.execute({
      car_id: car.id,
      user_id: '12345',
      expected_return_date: dateWithOneDayAdded,
    });

    expect(createSpyOn).toHaveBeenCalled();
    expect(rental).toHaveProperty('id');
  });

  it('Should not be able to create a new rental when there is an open rental for a car_id', async () => {
    await createRentalUseCase.execute({
      car_id: car.id,
      user_id: '12345',
      expected_return_date: dateWithOneDayAdded,
    });
    await expect(createRentalUseCase.execute({
      car_id: car.id,
      user_id: '12345',
      expected_return_date: dateWithOneDayAdded,
    })).rejects.toEqual(new AppError("There's a rental open for this car!"));
  });

  it('Should not be able to create a new rental when there is an open rental for a user_id', async () => {
    await createRentalUseCase.execute({
      car_id: car.id,
      user_id: '12345',
      expected_return_date: dateWithOneDayAdded,
    });
    await expect(createRentalUseCase.execute({
      car_id: '54321',
      user_id: '12345',
      expected_return_date: dateWithOneDayAdded,
    })).rejects.toEqual(new AppError("There's a rental open for this user!"));
  });

  it('Should not be able to create a new rental when expected_return_date is lower than 24 hours', async () => {
    await expect(
      createRentalUseCase.execute({
        car_id: car.id,
        user_id: '12345',
        expected_return_date: new Date(),
      }),
    ).rejects.toEqual(new AppError('The minimum limit for a rental is 24 hours'));
  });
});
