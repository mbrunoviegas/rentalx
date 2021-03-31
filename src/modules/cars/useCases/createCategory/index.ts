import { CategoryRepositoryImpl } from '../../repositories/implementations/CategoryRepositoryImpl';
import { CreateCategoryController } from './CreateCategoryController';
import { CreateCategoryUseCase } from './implementations/CreateCategoryUseCase';

export default (): CreateCategoryController => {
  const categoryRepository = new CategoryRepositoryImpl();
  const createCategoryUseCase = new CreateCategoryUseCase(categoryRepository);
  const createCategoryController = new CreateCategoryController(createCategoryUseCase);

  return createCategoryController;
};
