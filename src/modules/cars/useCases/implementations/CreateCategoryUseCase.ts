import { ICategoryRepository } from '../../repositories/interfaces/ICategoryRepository';
import { ICreateCategoryRequest } from '../dto/ICreateCategoryRequest';
import { ICreateCategory } from '../interfaces/ICreateCategory';

class CreateCategoryUseCase implements ICreateCategory {
  constructor(private categoryRepository: ICategoryRepository) {}

  execute({ name, description }: ICreateCategoryRequest): void {
    const categoryAlreadyExists = this.categoryRepository.findByName(name);
    if (name) {
      throw new Error('Category already exists');
    }
    this.categoryRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
