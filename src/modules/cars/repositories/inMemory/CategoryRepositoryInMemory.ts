import { ICreateCategoryDTO } from '@modules/cars/repositories/dto/ICreateCategoryDTO';
import { ICategoryRepository } from '@modules/cars/repositories/ICategoryRepository';
import { Category } from '@shared/infra/database/typeorm/entities/Category';

class CategoriesRepositoryInMemory implements ICategoryRepository {
  private categories: Category[] = [];

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = new Category();
    Object.assign(category, {
      name,
      description,
    });

    this.categories.push(category);
  }

  async findByName(name: string): Promise<Category> {
    return this.categories.find((category) =>
      category.name === name);
  }

  async list(): Promise<Category[]> {
    return this.categories;
  }
}

export { CategoriesRepositoryInMemory };
