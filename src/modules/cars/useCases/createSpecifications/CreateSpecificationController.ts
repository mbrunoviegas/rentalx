import { Request, Response } from 'express';
import { ICreateSpecification } from './interfaces/ICreateSpecification';

class CreateSpecificationController {
  constructor(private createSpecificationUseCase: ICreateSpecification) {}

  handle(request: Request, response: Response): Response {
    const { name, description } = request.body;
    this.createSpecificationUseCase.execute({ name, description });
    return response.status(201).send();
  }
}

export { CreateSpecificationController };
