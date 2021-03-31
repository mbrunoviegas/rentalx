import { Specification } from '../../../../../database/typeorm/entities/Specification';

interface IListSpecification {
  execute(): Specification[];
}

export { IListSpecification };
