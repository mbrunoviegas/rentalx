import { inject, injectable } from 'tsyringe';
import { ICategoryRepository } from '@modules/cars/repositories/ICategoryRepository';
import { Category } from '@shared/infra/database/typeorm/entities/Category';

@injectable()
class ListCategoryUseCase implements IUseCase<void, Category[]> {
  constructor(
    @inject('CategoryRepository')
    private categoryRepository: ICategoryRepository,
  ) { }

  async execute(): Promise<Category[]> {
    const categories: Category[] = await this.categoryRepository.list();
    return categories;
  }
}

export { ListCategoryUseCase };
