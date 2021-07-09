import { inject, injectable } from 'tsyringe';
import { ISpecificationRepository } from '@modules/cars/repositories/ISpecificationRepository';
import { Specification } from '@shared/infra/database/typeorm/entities/Specification';

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
