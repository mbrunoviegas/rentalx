import { Specification } from '../../../../../shared/database/typeorm/entities/Specification';

interface IListSpecification {
  execute(): Specification[];
}

export { IListSpecification };
