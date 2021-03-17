import { Category } from '../../models/Category';
import { ICreateCategoryDTO } from '../dto/ICreateCategoryDTO';

interface ICategoryRepository {
  create({ name, description }: ICreateCategoryDTO): void;
  findByName(name: string): Category;
  list(): Category[];
}

export { ICategoryRepository };
