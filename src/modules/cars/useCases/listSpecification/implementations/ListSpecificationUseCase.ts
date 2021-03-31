import { Specification } from '../../../../../shared/database/typeorm/entities/Specification';
import { ISpecificationRepository } from '../../../repositories/interfaces/ISpecificationRepository';
import { IListSpecification } from '../interfaces/IListSpecification';

class ListSpecificationUseCase implements IListSpecification {
  constructor(private specificationRepository: ISpecificationRepository) {}

  execute(): Specification[] {
    const specifications: Specification[] = this.specificationRepository.list();
    return specifications;
  }
}

export { ListSpecificationUseCase };
