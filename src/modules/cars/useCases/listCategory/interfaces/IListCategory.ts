import { Category } from '../../../../../database/typeorm/entities/Category';

interface IListCategory {
  execute(): Category[];
}

export { IListCategory };
