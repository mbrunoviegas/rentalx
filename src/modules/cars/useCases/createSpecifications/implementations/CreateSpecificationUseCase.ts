import { inject, injectable } from 'tsyringe';
import { ISpecificationRepository } from '@modules/cars/repositories/ISpecificationRepository';
import { ICreateCategoryRequestDTO } from '@modules/cars/useCases/createCategory/dto/ICreateCategoryRequestDTO';
import { AppError } from '@shared/core/errors/AppError';
import { Specification } from '@shared/infra/database/typeorm/entities/Specification';

@injectable()
class CreateSpecificationUseCase implements IUseCase<ICreateCategoryRequestDTO, Specification> {
  constructor(
    @inject('SpecificationRepository')
  private specificationRepository: ISpecificationRepository,
  ) { }

  async execute({ name, description }: ICreateCategoryRequestDTO): Promise<Specification> {
    const specification = await this.specificationRepository.findByName(name);

    if (specification) {
      throw new AppError('Specification already exists');
    }

    return this.specificationRepository.create({ name, description });
  }
}

export { CreateSpecificationUseCase };
