import { ICarRepository } from '@modules/cars/repositories/ICarRepository';
import { Car } from '@shared/infra/database/typeorm/entities/Car';
import { IListCarRequestDTO } from './dto/IListCarRequestDTO';

class ListCarUseCase implements IUseCase<IListCarRequestDTO, Car[]> {
  constructor(
    private carRepository: ICarRepository,
  ) {}

  async execute(requestProps: IListCarRequestDTO): Promise<Car[]> {
    return this.carRepository.listAllAvailable(requestProps);
  }
}

export { ListCarUseCase };
