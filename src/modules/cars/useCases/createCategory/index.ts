import { CategoryRepositoryImpl } from '../../repositories/implementations/CategoryRepositoryImpl';
import { CreateCategoryController } from './CreateCategoryController';
import { CreateCategoryUseCase } from './implementations/CreateCategoryUseCase';

const categoryRepository = CategoryRepositoryImpl.getInstance();
const createCategoryUseCase = new CreateCategoryUseCase(categoryRepository);
const createCategoryController = new CreateCategoryController(createCategoryUseCase);

export { createCategoryController };
