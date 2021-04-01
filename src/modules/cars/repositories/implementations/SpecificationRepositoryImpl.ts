import { getRepository, Repository } from 'typeorm';
import { Specification } from '../../../../shared/database/typeorm/entities/Specification';
import { ICreateSpecificationDTO } from '../dto/ICreateSpecificationDTO';
import { ISpecificationRepository } from '../interfaces/ISpecificationRepository';

class SpecificationRepositoryImpl implements ISpecificationRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }

  async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const specification = this.repository.create({ name, description });

    await this.repository.save(specification);
  }

  async findByName(name: string): Promise<Specification | undefined> {
    const specification = await this.repository.findOne({ name });
    return specification;
  }

  async list(): Promise<Specification[]> {
    const specifications = await this.repository.find();
    return specifications;
  }
}

export { SpecificationRepositoryImpl };
