import { ICategoryRepository } from '../../../repositories/interfaces/ICategoryRepository';
import { ICreateCategoryRequestDTO } from '../dto/ICreateCategoryRequestDTO';
import { ICreateCategory } from '../interfaces/ICreateCategory';

class CreateCategoryUseCase implements ICreateCategory {
  constructor(private categoryRepository: ICategoryRepository) {}

  execute({ name, description }: ICreateCategoryRequestDTO): void {
    const categoryAlreadyExists = this.categoryRepository.findByName(name);
    if (categoryAlreadyExists) {
      throw new Error('Category already exists');
    }
    this.categoryRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
