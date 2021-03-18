import { Category } from '../../../models/Category';
import { ICategoryRepository } from '../../../repositories/interfaces/ICategoryRepository';
import { IListCategory } from '../interfaces/IListCategory';

class ListCategoryUseCase implements IListCategory {
  constructor(private categoryRepository: ICategoryRepository) {}

  execute(): Category[] {
    return this.categoryRepository.list();
  }
}

export { ListCategoryUseCase };
