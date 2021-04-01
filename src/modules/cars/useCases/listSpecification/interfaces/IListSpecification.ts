import { Specification } from '../../../../../shared/database/typeorm/entities/Specification';

interface IListSpecification {
  execute(): Promise<Specification[]>;
}

export { IListSpecification };
