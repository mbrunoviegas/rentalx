import { getRepository, Repository } from 'typeorm';
import { ICreateCategoryDTO } from '@modules/cars/repositories/dto/ICreateCategoryDTO';
import { ICategoryRepository } from '@modules/cars/repositories/interfaces/ICategoryRepository';
import { Category } from '@shared/database/typeorm/entities/Category';

class CategoryRepository implements ICategoryRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = getRepository(Category);
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = this.repository.create({
      name,
      description,
    });
    await this.repository.save(category);
  }

  async findByName(name: string): Promise<Category | undefined> {
    const category = await this.repository.findOne({ name });
    return category;
  }

  async list(): Promise<Category[]> {
    const categories = await this.repository.find();
    return categories;
  }
}
export { CategoryRepository };
