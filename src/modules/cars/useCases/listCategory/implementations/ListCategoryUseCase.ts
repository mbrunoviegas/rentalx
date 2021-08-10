import { inject, injectable } from 'tsyringe';
import { ICategoryRepository } from '@modules/cars/repositories/ICategoryRepository';
import { IUseCase } from '@shared/core/IUseCase';
import { Category } from '@shared/infra/database/typeorm/entities/Category';

@injectable()
class ListCategoryUseCase implements IUseCase<void, Category[]> {
  constructor(
    @inject('CategoryRepository')
    private categoryRepository: ICategoryRepository,
  ) { }

  async execute(): Promise<Category[]> {
    return this.categoryRepository.list();
  }
}

export { ListCategoryUseCase };
