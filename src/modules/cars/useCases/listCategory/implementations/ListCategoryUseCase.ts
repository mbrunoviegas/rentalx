import { inject, injectable } from 'tsyringe';
import { Category } from '../../../../../shared/database/typeorm/entities/Category';
import { ICategoryRepository } from '../../../repositories/interfaces/ICategoryRepository';

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
