import { Request, Response } from 'express';
import { Specification } from '../../../../shared/database/typeorm/entities/Specification';
import { IListSpecification } from './interfaces/IListSpecification';

class ListSpecificationController {
  constructor(private specificationUseCase: IListSpecification) {}

  handle(request: Request, response: Response): Response {
    const specifications: Specification[] = this.specificationUseCase.execute();
    return response.status(200).json(specifications);
  }
}

export { ListSpecificationController };
