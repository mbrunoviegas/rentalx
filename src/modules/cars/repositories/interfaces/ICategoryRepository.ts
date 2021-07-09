import { Category } from '../../../../shared/database/typeorm/entities/Category';
import { ICreateCategoryDTO } from '../dto/ICreateCategoryDTO';

interface ICategoryRepository {
  create({ name, description }: ICreateCategoryDTO): Promise<void>;
  findByName(name: string): Promise<Category | undefined>;
  list(): Promise<Category[]>;
}

export { ICategoryRepository };
