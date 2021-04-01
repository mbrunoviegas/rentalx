import { Specification } from '../../../../shared/database/typeorm/entities/Specification';
import { ICreateSpecificationDTO } from '../dto/ICreateSpecificationDTO';

interface ISpecificationRepository {
  create({ name, description }: ICreateSpecificationDTO): Promise<void>;
  findByName(name: string): Promise<Specification | undefined>;
  list(): Promise<Specification[]>;
}

export { ISpecificationRepository };
