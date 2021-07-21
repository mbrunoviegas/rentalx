import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { CarsRepositoryInMemory } from '@modules/cars/repositories/inMemory/CarsRepositoryInMemory';
import { AppError } from '@shared/core/errors/AppError';
import { ICreateCarRequestDTO } from '../dto/ICreateCarRequestDTO';
import { CreateCarUseCase } from '../implementations/CreateCarUseCase';

describe('Create Car Use Case', () => {
  let createCarUseCase: CreateCarUseCase;
  let carsRepository: ICarsRepository;

  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepository);
  });

  it('Should be able to create a new car', async () => {
    const carProps: ICreateCarRequestDTO = {
      name: 'Test Car',
      description: 'Car for test',
      brand: 'Test',
      category_id: '11',
      daily_rate: 100,
      fine_amount: 60,
      license_plate: 'TST1234',
    };

    const spyOnCreate = jest.spyOn(carsRepository, 'create');

    const car = await createCarUseCase.execute(carProps);

    expect(spyOnCreate).toHaveBeenCalled();
    expect(car).toHaveProperty('id');
  });

  it('Should not be able to create a car with duplicate license_plate', async () => {
    const carProps: ICreateCarRequestDTO = {
      name: 'Test Car',
      description: 'Car for test',
      brand: 'Test',
      category_id: '11',
      daily_rate: 100,
      fine_amount: 60,
      license_plate: 'TST1234',
    };

    await createCarUseCase.execute(carProps);

    expect(async () => {
      const spyOnFindByLicensePlate = jest.spyOn(carsRepository, 'findByLicensePlate');
      const spyOnCreate = jest.spyOn(carsRepository, 'create');
      await createCarUseCase.execute(carProps);

      expect(spyOnFindByLicensePlate).toHaveBeenCalled();
      expect(spyOnCreate).toHaveBeenCalledTimes(0);
    }).rejects.toBeInstanceOf(AppError);
  });

  it('Should create a car with avaliable property true', async () => {
    const carProps: ICreateCarRequestDTO = {
      name: 'Test Car',
      description: 'Car for test',
      brand: 'Test',
      category_id: '11',
      daily_rate: 100,
      fine_amount: 60,
      license_plate: 'TST1234',
    };

    const car = await createCarUseCase.execute(carProps);

    expect(car.available).toBeTruthy();
  });
});
