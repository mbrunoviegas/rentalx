import { ISpecificationRepository } from '../../../repositories/interfaces/ISpecificationRepository';
import { ICreateCategoryRequestDTO } from '../../createCategory/dto/ICreateCategoryRequestDTO';
import { ICreateSpecification } from '../interfaces/ICreateSpecification';

class CreateSpecificationUseCase implements ICreateSpecification {
  constructor(private specificationRepository: ISpecificationRepository) {}

  execute({ name, description }: ICreateCategoryRequestDTO): void {
    const specification = this.specificationRepository.findByName(name);

    if (specification) {
      throw new Error('Specification already exists');
    }

    this.specificationRepository.create({ name, description });
  }
}

export { CreateSpecificationUseCase };
