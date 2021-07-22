import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/inMemory/RentalsRepositoryInMemory';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { CreateRentalUseCase } from '../implementations/CreateRentalUseCase';

describe('Create Rental Use Case', () => {
  let createRentalUseCase: CreateRentalUseCase;
  let rentalsRepository: IRentalsRepository;

  beforeEach(() => {
    rentalsRepository = new RentalsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(rentalsRepository);
  });

  it('Should be able to create a new rental', async () => {
    await createRentalUseCase.execute({
      car_id: '12345',
      user_id: '12345',
      expected_return_date: new Date(),
    });
  });
});
