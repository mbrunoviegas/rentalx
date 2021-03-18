import { ICreateCategoryRequestDTO } from '../dto/ICreateCategoryRequestDTO';

interface ICreateCategory {
  execute({ name, description }: ICreateCategoryRequestDTO): void;
}

export { ICreateCategory };
