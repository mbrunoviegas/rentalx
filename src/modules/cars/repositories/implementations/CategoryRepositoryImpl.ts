import { Category } from '../../models/Category';
import { ICreateCategoryDTO } from '../dto/ICreateCategoryDTO';
import { ICategoryRepository } from '../interfaces/ICategoryRepository';

class CategoryRepositoryImpl implements ICategoryRepository {
  private categories: Category[];

  private static INSTANCE: CategoryRepositoryImpl;

  private constructor() {
    this.categories = [];
  }

  public static getInstance(): CategoryRepositoryImpl {
    if (!this.INSTANCE) {
      this.INSTANCE = new CategoryRepositoryImpl();
    }
    return this.INSTANCE;
  }

  create({ name, description }: ICreateCategoryDTO): void {
    const category = new Category();
    Object.assign(category, {
      name,
      description,
      created_at: new Date(),
    });

    this.categories.push(category);
  }
  findByName(name: string): Category {
    return this.categories.find((category) =>
      category.name === name);
  }
  list(): Category[] {
    return this.categories;
  }
}

export { CategoryRepositoryImpl };
