import { inject, injectable } from 'tsyringe';
import { ICarsRepository } from '@shared/infra/database/typeorm/repositories/ICarsRepository';
import { AppError } from '@shared/core/errors/AppError';
import { Car } from '@shared/infra/database/typeorm/entities/Car';
import { ICreateCarRequestDTO } from '../dto/ICreateCarRequestDTO';

@injectable()
class CreateCarUseCase implements IUseCase<ICreateCarRequestDTO, Car> {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
  ) { }

  async execute(requestProps: ICreateCarRequestDTO): Promise<Car> {
    const carAlreadyExists = await this.carsRepository.findByLicensePlate(requestProps.license_plate);

    if (carAlreadyExists) {
      throw new AppError('Car already exists!');
    }

    return this.carsRepository.create(requestProps);
  }
}

export { CreateCarUseCase };
