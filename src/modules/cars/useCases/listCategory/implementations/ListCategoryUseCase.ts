import { inject, injectable } from 'tsyringe';
import { Category } from '../../../../../shared/database/typeorm/entities/Category';
import { ICategoryRepository } from '../../../repositories/interfaces/ICategoryRepository';
import { IListCategory } from '../interfaces/IListCategory';

@injectable()
class ListCategoryUseCase implements IListCategory {
  constructor(
    @inject('CategoryRepositoryImpl')
    private categoryRepository: ICategoryRepository,
  ) { }

  async execute(): Promise<Category[]> {
    const categories: Category[] = await this.categoryRepository.list();
    return categories;
  }
}

export { ListCategoryUseCase };
