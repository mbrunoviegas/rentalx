import { inject, injectable } from 'tsyringe';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { Car } from '@shared/infra/database/typeorm/entities/Car';
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
