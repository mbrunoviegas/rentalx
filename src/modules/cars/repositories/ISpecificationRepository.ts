import { ICreateSpecificationDTO } from '@modules/cars/repositories/dto/ICreateSpecificationDTO';
import { Specification } from '@shared/infra/database/typeorm/entities/Specification';

interface ISpecificationRepository {
  create({ name, description }: ICreateSpecificationDTO): Promise<Specification>;
  findByName(name: string): Promise<Specification | undefined>;
  list(): Promise<Specification[]>;
  findByIds(ids: string[]): Promise<Specification[]>;
}

export { ISpecificationRepository };
