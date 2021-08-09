import { inject, injectable } from 'tsyringe';
import { ICarsRepository } from '@shared/infra/database/typeorm/repositories/ICarsRepository';
import { ISpecificationRepository } from '@modules/cars/repositories/ISpecificationRepository';
import { AppError } from '@shared/core/errors/AppError';
import { Car } from '@shared/infra/database/typeorm/entities/Car';
import { ICreateCarSpecificationRequestDTO } from '../dto/ICreateCarSpecificationRequestDTO';

@injectable()
class CreateCarSpecificationUseCase
implements IUseCase<ICreateCarSpecificationRequestDTO, Car> {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
    @inject('SpecificationRepository')
    private specificationsRepository: ISpecificationRepository,
  ) { }

  async execute({ car_id, specifications_id }: ICreateCarSpecificationRequestDTO): Promise<Car> {
    const carAlreadyExists = await this.carsRepository.findById(car_id);

    if (!carAlreadyExists) {
      throw new AppError('Car does not exist!');
    }

    const specifications = await this.specificationsRepository.findByIds(specifications_id);
    carAlreadyExists.specifications = specifications;

    return this.carsRepository.create(carAlreadyExists);
  }
}

export { CreateCarSpecificationUseCase };
