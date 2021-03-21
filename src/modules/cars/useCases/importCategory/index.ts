import { CategoryRepositoryImpl } from '../../repositories/implementations/CategoryRepositoryImpl';
import { ImportCategoryUseCase } from './implementations/ImportCategoryUseCase';
import { ImportCategoryController } from './ImportCategoryController';

const categoryRepository = CategoryRepositoryImpl.getInstance();
const importCategoryUseCase = new ImportCategoryUseCase(categoryRepository);
const importCategoryController = new ImportCategoryController(importCategoryUseCase);

export { importCategoryController };
