import { Category } from '../../models/Category';
import { ICreateCategoryDTO } from '../dto/ICreateCategoryDTO';
import { ICategoryRepository } from '../interfaces/ICategoryRepository';

class CategoryRepositoryImpl implements ICategoryRepository {
  create({ name, description } : ICreateCategoryDTO): void {
    const categoryAlreadyExists = this.findByName(name);
  }
  findByName(name: string): Category {
    throw new Error('Method not implemented.');
  }
  list(): Category[] {
    throw new Error('Method not implemented.');
  }
}

export { CategoryRepositoryImpl };
