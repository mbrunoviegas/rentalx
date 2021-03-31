import { Specification } from '../../../../database/typeorm/entities/Specification';
import { ICreateSpecificationDTO } from '../dto/ICreateSpecificationDTO';
import { ISpecificationRepository } from '../interfaces/ISpecificationRepository';

class SpecificationRepositoryImpl implements ISpecificationRepository {
  private specifications: Specification[];
  private static INSTANCE: SpecificationRepositoryImpl;

  private constructor() {
    this.specifications = [];
  }

  static getInstance(): SpecificationRepositoryImpl {
    if (!this.INSTANCE) {
      this.INSTANCE = new SpecificationRepositoryImpl();
    }

    return this.INSTANCE;
  }

  create({ name, description }: ICreateSpecificationDTO): void {
    const specification = new Specification();

    Object.assign(specification, {
      name,
      description,
    });

    this.specifications.push(specification);
  }
  findByName(name: string): Specification {
    return this.specifications.find((specification) =>
      specification.name === name);
  }
  list(): Specification[] {
    return this.specifications;
  }
}

export { SpecificationRepositoryImpl };
