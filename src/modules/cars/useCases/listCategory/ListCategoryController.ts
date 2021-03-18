import { Request, Response } from 'express';
import { ListCategoryUseCase } from './implementations/ListCategoryUseCase';

class ListCategoryController {
  constructor(private listCategoryUseCase: ListCategoryUseCase) {
  }

  handle(request: Request, response: Response): Response {
    const categories = this.listCategoryUseCase.execute();
    return response.status(200).json(categories);
  }
}

export { ListCategoryController };
