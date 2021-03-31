import { Category } from '../../../../../shared/database/typeorm/entities/Category';

interface IListCategory {
  execute(): Category[];
}

export { IListCategory };
