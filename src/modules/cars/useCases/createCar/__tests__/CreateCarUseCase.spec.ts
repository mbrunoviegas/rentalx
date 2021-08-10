import { AppError } from '@shared/core/errors/AppError';
import { ICarsRepository } from '@shared/infra/database/typeorm/repositories/ICarsRepository';
import { CarsRepositoryInMemory } from '@shared/infra/database/typeorm/repositories/inMemory/CarsRepositoryInMemory';
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

    expect(
      createCarUseCase.execute(carProps),
    ).rejects.toEqual(new AppError('Car already exists!'));
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
