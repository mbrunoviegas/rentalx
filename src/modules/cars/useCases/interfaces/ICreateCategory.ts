import { ICreateCategoryRequest } from '../dto/ICreateCategoryRequest';

interface ICreateCategory {
  execute({ name, description }: ICreateCategoryRequest): void;
}

export { ICreateCategory };
