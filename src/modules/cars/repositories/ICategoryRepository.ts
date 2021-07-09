import { ICreateCategoryDTO } from '@modules/cars/repositories/dto/ICreateCategoryDTO';
import { Category } from '@shared/infra/database/typeorm/entities/Category';

interface ICategoryRepository {
  create({ name, description }: ICreateCategoryDTO): Promise<void>;
  findByName(name: string): Promise<Category | undefined>;
  list(): Promise<Category[]>;
}

export { ICategoryRepository };
