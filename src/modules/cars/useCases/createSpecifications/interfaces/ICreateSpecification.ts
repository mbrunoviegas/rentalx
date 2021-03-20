import { ICreateCategoryRequestDTO } from '../../createCategory/dto/ICreateCategoryRequestDTO';

interface ICreateSpecification {
  execute({ name, description }: ICreateCategoryRequestDTO): void;
}

export { ICreateSpecification };
