import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../../shared/errors/AppError';
import { ICategoryRepository } from '../../../repositories/interfaces/ICategoryRepository';
import { ICreateCategoryRequestDTO } from '../dto/ICreateCategoryRequestDTO';

@injectable()
class CreateCategoryUseCase implements IUseCase<ICreateCategoryRequestDTO, void> {
  constructor(
    @inject('CategoryRepository')
    private categoryRepository: ICategoryRepository,
  ) { }

  async execute({ name, description }: ICreateCategoryRequestDTO): Promise<void> {
    const categoryAlreadyExists = await this.categoryRepository.findByName(name);
    if (categoryAlreadyExists) {
      throw new AppError('Category already exists');
    }
    this.categoryRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
