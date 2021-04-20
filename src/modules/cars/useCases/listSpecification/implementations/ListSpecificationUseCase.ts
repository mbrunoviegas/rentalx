import { inject, injectable } from 'tsyringe';
import { Specification } from '../../../../../shared/database/typeorm/entities/Specification';
import { ISpecificationRepository } from '../../../repositories/interfaces/ISpecificationRepository';

@injectable()
class ListSpecificationUseCase implements IUseCase<void, Specification[]> {
  constructor(
    @inject('SpecificationRepository')
    private specificationRepository: ISpecificationRepository,
  ) { }

  async execute(): Promise<Specification[]> {
    const specifications: Specification[] = await this.specificationRepository.list();
    return specifications;
  }
}

export { ListSpecificationUseCase };
