import { inject, injectable } from 'tsyringe';
import { IUseCase } from '@shared/core/IUseCase';
import { Car } from '@shared/infra/database/typeorm/entities/Car';
import { ICarsRepository } from '@shared/infra/database/typeorm/repositories/ICarsRepository';
import { IListAvailableCarsRequestDTO } from '../dto/IListAvailableCarsRequestDTO';

@injectable()
class ListAvailableCarsUseCase implements IUseCase<IListAvailableCarsRequestDTO, Car[]> {
  constructor(
    @inject('CarsRepository')
    private carRepository: ICarsRepository,
  ) {}

  async execute(requestProps: IListAvailableCarsRequestDTO): Promise<Car[]> {
    return this.carRepository.listAllAvailable(requestProps);
  }
}

export { ListAvailableCarsUseCase };
