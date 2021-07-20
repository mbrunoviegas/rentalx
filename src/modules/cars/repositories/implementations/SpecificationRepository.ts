import { getRepository, Repository } from 'typeorm';
import { Specification } from '@shared/infra/database/typeorm/entities/Specification';
import { ICreateSpecificationDTO } from '../dto/ICreateSpecificationDTO';
import { ISpecificationRepository } from '../ISpecificationRepository';

class SpecificationRepository implements ISpecificationRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }

  async create({ name, description }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = this.repository.create({ name, description });

    return this.repository.save(specification);
  }

  async findByName(name: string): Promise<Specification | undefined> {
    const specification = await this.repository.findOne({ name });
    return specification;
  }

  async list(): Promise<Specification[]> {
    const specifications = await this.repository.find();
    return specifications;
  }

  findByIds(ids: string[]): Promise<Specification[]> {
    return this.repository.findByIds(ids);
  }
}

export { SpecificationRepository };
