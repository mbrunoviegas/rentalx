import { inject, injectable } from 'tsyringe';
import { ISpecificationRepository } from '@modules/cars/repositories/interfaces/ISpecificationRepository';
import { ICreateCategoryRequestDTO } from '@modules/cars/useCases/createCategory/dto/ICreateCategoryRequestDTO';
import { AppError } from '@shared/errors/AppError';

@injectable()
class CreateSpecificationUseCase implements IUseCase<ICreateCategoryRequestDTO, void> {
  constructor(
    @inject('SpecificationRepository')
  private specificationRepository: ISpecificationRepository,
  ) { }

  async execute({ name, description }: ICreateCategoryRequestDTO): Promise<void> {
    const specification = await this.specificationRepository.findByName(name);

    if (specification) {
      throw new AppError('Specification already exists');
    }

    await this.specificationRepository.create({ name, description });
  }
}

export { CreateSpecificationUseCase };
