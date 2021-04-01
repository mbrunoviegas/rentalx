import { inject, injectable } from 'tsyringe';
import { Specification } from '../../../../../shared/database/typeorm/entities/Specification';
import { ISpecificationRepository } from '../../../repositories/interfaces/ISpecificationRepository';
import { IListSpecification } from '../interfaces/IListSpecification';

@injectable()
class ListSpecificationUseCase implements IListSpecification {
  constructor(
    @inject('SpecificationRepositoryImpl')
    private specificationRepository: ISpecificationRepository,
  ) { }

  async execute(): Promise<Specification[]> {
    const specifications: Specification[] = await this.specificationRepository.list();
    return specifications;
  }
}

export { ListSpecificationUseCase };
