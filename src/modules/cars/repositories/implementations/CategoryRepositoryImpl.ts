import { getRepository, Repository } from 'typeorm';
import { Category } from '../../../../database/typeorm/entities/Category';
import { ICreateCategoryDTO } from '../dto/ICreateCategoryDTO';
import { ICategoryRepository } from '../interfaces/ICategoryRepository';

class CategoryRepositoryImpl implements ICategoryRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = getRepository(Category);
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = this.repository.create({
      name,
      description,
    });
    console.log(category);
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
export { CategoryRepositoryImpl };
