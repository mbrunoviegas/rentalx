import { inject, injectable } from 'tsyringe';
import { ICategoryRepository } from '@modules/cars/repositories/ICategoryRepository';
import { ICreateCategoryRequestDTO } from '@modules/cars/useCases/createCategory/dto/ICreateCategoryRequestDTO';
import { AppError } from '@shared/core/errors/AppError';
import { IUseCase } from '@shared/core/IUseCase';

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
