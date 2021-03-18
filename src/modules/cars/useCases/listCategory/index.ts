import { CategoryRepositoryImpl } from '../../repositories/implementations/CategoryRepositoryImpl';
import { ListCategoryUseCase } from './implementations/ListCategoryUseCase';
import { ListCategoryController } from './ListCategoryController';

const categoryRepository = CategoryRepositoryImpl.getInstance();
const listCategoryUseCase = new ListCategoryUseCase(categoryRepository);
const listCategoryController = new ListCategoryController(listCategoryUseCase);

export { listCategoryController };
