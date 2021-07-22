import dayjs from 'dayjs';
import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/inMemory/RentalsRepositoryInMemory';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { AppError } from '@shared/core/errors/AppError';
import { DateProvider } from '@shared/core/providers/implementations/DateProvider';
import { IDateProvider } from '@shared/core/providers/interfaces/IDateProvider';
import { CreateRentalUseCase } from '../implementations/CreateRentalUseCase';

describe('Create Rental Use Case', () => {
  const dateWithOneDayAdded = dayjs().add(1, 'day').toDate();
  let createRentalUseCase: CreateRentalUseCase;
  let rentalsRepository: IRentalsRepository;
  let dateProvider: IDateProvider;

  beforeEach(() => {
    rentalsRepository = new RentalsRepositoryInMemory();
    dateProvider = new DateProvider();
    createRentalUseCase = new CreateRentalUseCase(rentalsRepository, dateProvider);
  });

  it('Should be able to create a new rental', async () => {
    const createSpyOn = jest.spyOn(rentalsRepository, 'create');
    const rental = await createRentalUseCase.execute({
      car_id: '12345',
      user_id: '12345',
      expected_return_date: dateWithOneDayAdded,
    });

    expect(createSpyOn).toHaveBeenCalled();
    expect(rental).toHaveProperty('id');
  });

  it('Should not be able to create a new rental when there is an open rental for a car_id', () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: '12345',
        user_id: '12345',
        expected_return_date: dateWithOneDayAdded,
      });

      const findOpenRentalByCarIdSpyOn = jest.spyOn(rentalsRepository, 'findOpenRentalByCarId');
      const createSpyOn = jest.spyOn(rentalsRepository, 'create');
      await createRentalUseCase.execute({
        car_id: '12345',
        user_id: '12345',
        expected_return_date: dateWithOneDayAdded,
      });

      expect(findOpenRentalByCarIdSpyOn).toHaveBeenCalled();
      expect(createSpyOn).not.toHaveBeenCalled();
    }).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to create a new rental when there is an open rental for a user_id', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: '12345',
        user_id: '12345',
        expected_return_date: dateWithOneDayAdded,
      });

      const findOpenRentalByUserIdSpyOn = jest.spyOn(rentalsRepository, 'findOpenRentalByUserId');
      const createSpyOn = jest.spyOn(rentalsRepository, 'create');
      await createRentalUseCase.execute({
        car_id: '54321',
        user_id: '12345',
        expected_return_date: dateWithOneDayAdded,
      });

      expect(findOpenRentalByUserIdSpyOn).toHaveBeenCalled();
      expect(createSpyOn).not.toHaveBeenCalled();
    }).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to create a new rental when expected_return_date is lower than 24 hours', async () => {
    expect(async () => {
      const compareDatesSpyOn = jest.spyOn(dateProvider, 'compareTwoDatesByHour');
      const createSpyOn = jest.spyOn(rentalsRepository, 'create');
      await createRentalUseCase.execute({
        car_id: '54321',
        user_id: '12345',
        expected_return_date: new Date(),
      });

      expect(compareDatesSpyOn).toHaveBeenCalled();
      expect(createSpyOn).not.toHaveBeenCalled();
    }).rejects.toBeInstanceOf(AppError);
  });
});
