import { DeepPartial } from 'typeorm';
import { ICarsRepository } from '@shared/infra/database/typeorm/repositories/ICarsRepository';
import { CarsRepositoryInMemory } from '@shared/infra/database/typeorm/repositories/inMemory/CarsRepositoryInMemory';
import { Car } from '@shared/infra/database/typeorm/entities/Car';
import { ListAvailableCarsUseCase } from '../implementations/ListAvailableCarsUseCase';

describe('List Car Use Case', () => {
  let listCarUseCase: ListAvailableCarsUseCase;
  let carRepository: ICarsRepository;

  beforeEach(() => {
    carRepository = new CarsRepositoryInMemory();
    listCarUseCase = new ListAvailableCarsUseCase(carRepository);
  });

  it('Should list all available cars', async () => {
    const car: DeepPartial<Car> = {
      name: 'Test',
      description: 'Test car',
      daily_rate: 100.00,
      fine_amount: 50.00,
      license_plate: 'TST1234',
      brand: 'TEST',
      category_id: '123456789',
      available: true,
    };

    await carRepository.create(car as Car);

    const spyOnListAvailable = jest.spyOn(carRepository, 'listAllAvailable');

    const cars = await listCarUseCase.execute({});

    expect(spyOnListAvailable).toHaveBeenCalled();
    expect(cars).toMatchObject([car]);
  });

  it('Should list all available cars by name', async () => {
    const car: DeepPartial<Car> = {
      name: 'Test',
      description: 'Test car',
      daily_rate: 100.00,
      fine_amount: 50.00,
      license_plate: 'TST1234',
      brand: 'TEST',
      category_id: '123456789',
      available: true,
    };

    const car1: DeepPartial<Car> = {
      name: 'Test 1',
      description: 'Test car',
      daily_rate: 100.00,
      fine_amount: 50.00,
      license_plate: 'TST1234',
      brand: 'TEST',
      category_id: '123456789',
      available: true,
    };

    await carRepository.create(car as Car);
    await carRepository.create(car1 as Car);

    const spyOnListAvailable = jest.spyOn(carRepository, 'listAllAvailable');

    const cars = await listCarUseCase.execute({ name: 'Test' });

    expect(spyOnListAvailable).toHaveBeenCalled();
    expect(cars).toMatchObject([car]);
  });

  it('Should list all available cars by brand', async () => {
    const car: DeepPartial<Car> = {
      name: 'Test',
      description: 'Test car',
      daily_rate: 100.00,
      fine_amount: 50.00,
      license_plate: 'TST1234',
      brand: 'TEST',
      category_id: '123456789',
      available: true,
    };

    const car1: DeepPartial<Car> = {
      name: 'Test 1',
      description: 'Test car',
      daily_rate: 100.00,
      fine_amount: 50.00,
      license_plate: 'TST1234',
      brand: 'TEST 1',
      category_id: '123456789',
      available: true,
    };

    await carRepository.create(car as Car);
    await carRepository.create(car1 as Car);

    const spyOnListAvailable = jest.spyOn(carRepository, 'listAllAvailable');

    const cars = await listCarUseCase.execute({ brand: 'TEST' });

    expect(spyOnListAvailable).toHaveBeenCalled();
    expect(cars).toMatchObject([car]);
  });

  it('Should list all available cars by category_id', async () => {
    const car: DeepPartial<Car> = {
      name: 'Test',
      description: 'Test car',
      daily_rate: 100.00,
      fine_amount: 50.00,
      license_plate: 'TST1234',
      brand: 'TEST',
      category_id: '123456789',
      available: true,
    };

    const car1: DeepPartial<Car> = {
      name: 'Test 1',
      description: 'Test car',
      daily_rate: 100.00,
      fine_amount: 50.00,
      license_plate: 'TST1234',
      brand: 'TEST',
      category_id: '111111111',
      available: true,
    };

    await carRepository.create(car as Car);
    await carRepository.create(car1 as Car);

    const spyOnListAvailable = jest.spyOn(carRepository, 'listAllAvailable');

    const cars = await listCarUseCase.execute({ category_id: '123456789' });

    expect(spyOnListAvailable).toHaveBeenCalled();
    expect(cars).toMatchObject([car]);
  });
});
