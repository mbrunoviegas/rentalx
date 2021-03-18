import { Category } from '../../../models/Category';

interface IListCategory {
  execute(): Category[];
}

export { IListCategory };
