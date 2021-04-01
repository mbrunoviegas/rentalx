import { Category } from '../../../../../shared/database/typeorm/entities/Category';

interface IListCategory {
  execute(): Promise<Category[]>;
}

export { IListCategory };
