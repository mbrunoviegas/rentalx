import { ICategoryRepository } from '../../../repositories/interfaces/ICategoryRepository';
import { ICreateCategoryRequestDTO } from '../dto/ICreateCategoryRequestDTO';
import { ICreateCategory } from '../interfaces/ICreateCategory';

class CreateCategoryUseCase implements ICreateCategory {
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute({ name, description }: ICreateCategoryRequestDTO): Promise<void> {
    const categoryAlreadyExists = await this.categoryRepository.findByName(name);
    if (categoryAlreadyExists) {
      throw new Error('Category already exists');
    }
    this.categoryRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
