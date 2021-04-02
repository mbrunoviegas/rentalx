import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../../shared/errors/AppError';
import { ISpecificationRepository } from '../../../repositories/interfaces/ISpecificationRepository';
import { ICreateCategoryRequestDTO } from '../../createCategory/dto/ICreateCategoryRequestDTO';
import { ICreateSpecification } from '../interfaces/ICreateSpecification';

@injectable()
class CreateSpecificationUseCase implements ICreateSpecification {
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
