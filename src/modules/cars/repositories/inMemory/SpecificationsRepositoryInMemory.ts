import { v4 as uuid } from 'uuid';
import { Specification } from '@shared/infra/database/typeorm/entities/Specification';
import { ICreateSpecificationDTO } from '../dto/ICreateSpecificationDTO';
import { ISpecificationRepository } from '../ISpecificationRepository';

class SpecificationsRepositoryInMemory implements ISpecificationRepository {
  private specifications: Specification[] = [];

  async create({ name, description }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = new Specification();

    Object.assign(specification, {
      id: uuid(),
      name,
      description,
    });

    this.specifications.push();

    return specification;
  }

  async findByName(name: string): Promise<Specification> {
    return this.specifications.find((specification) =>
      specification.name === name);
  }

  async list(): Promise<Specification[]> {
    return this.specifications;
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    return this.specifications.filter(({ id }) =>
      ids.includes(id));
  }
}

export { SpecificationsRepositoryInMemory };
