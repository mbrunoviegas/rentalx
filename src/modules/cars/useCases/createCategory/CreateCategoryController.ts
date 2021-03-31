import { Request, Response } from 'express';
import { ICreateCategory } from './interfaces/ICreateCategory';

class CreateCategoryController {
  constructor(private createCategoryUseCase: ICreateCategory) { }

  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;
    this.createCategoryUseCase.execute({ name, description });
    return response.status(201).send();
  }
}

export { CreateCategoryController };
