import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { SpecificationRepository } from '@modules/cars/repositories/implementations/SpecificationRepository';
import { CarsRepositoryInMemory } from '@modules/cars/repositories/inMemory/CarsRepositoryInMemory';
import { SpecificationsRepositoryInMemory } from '@modules/cars/repositories/inMemory/SpecificationsRepositoryInMemory';
import { ISpecificationRepository } from '@modules/cars/repositories/ISpecificationRepository';
import { AppError } from '@shared/core/errors/AppError';
import { CreateCarSpecificationUseCase } from '../implementations/CreateCarSpecificationUseCase';

describe('Create Car Specification Use Case', () => {
  let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
  let carsRepository: ICarsRepository;
  let specificationsRepositoy: ISpecificationRepository;

  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    specificationsRepositoy = new SpecificationsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(carsRepository, specificationsRepositoy);
  });

  it('Should not add specification to a nonexistent car', () => {
    expect(async () => {
      await createCarSpecificationUseCase.execute(
        {
          car_id: '12345',
          specifications_id: ['123456'],
        },
      );
    }).rejects.toBeInstanceOf(AppError);
  });

  it('Should be able to create a car specification', async () => {
    const specification = await specificationsRepositoy.create({
      name: 'Test',
      description: 'Test Specification',
    });

    const car = await carsRepository.create({
      name: 'Test',
      description: 'Car for test',
      brand: 'Brand Test',
      category_id: '123456',
      daily_rate: 100.00,
      fine_amount: 50.00,
      license_plate: 'TST1234',
    });

    const spyOnFindByIds = jest.spyOn(specificationsRepositoy, 'findByIds');

    await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id: [specification.id],
    });

    car.specifications = [specification];
    const updatedCar = await carsRepository.findById(car.id);

    expect(spyOnFindByIds).toHaveBeenCalled();
    expect(car.id).toEqual(updatedCar.id);
    expect(updatedCar).toEqual(car);
  });
});
