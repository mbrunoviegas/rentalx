import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { ISpecificationRepository } from '@modules/cars/repositories/ISpecificationRepository';
import { AppError } from '@shared/core/errors/AppError';
import { ICreateCarSpecificationRequestDTO } from '../dto/ICreateCarSpecificationRequestDTO';

class CreateCarSpecificationUseCase
implements IUseCase<ICreateCarSpecificationRequestDTO, void> {
  constructor(
    private carsRepository: ICarsRepository,
    private specificationsRepository: ISpecificationRepository,
  ) { }

  async execute({ car_id, specifications_id }: ICreateCarSpecificationRequestDTO): Promise<void> {
    const carAlreadyExists = await this.carsRepository.findById(car_id);

    if (!carAlreadyExists) {
      throw new AppError('Car does not exist!');
    }

    const specifications = await this.specificationsRepository.findByIds(specifications_id);
    carAlreadyExists.specifications = specifications;

    await this.carsRepository.create(carAlreadyExists);
  }
}

export { CreateCarSpecificationUseCase };
