import { Request, Response } from 'express';
import { IImportCategory } from './interfaces/IImportCategory';

class ImportCategoryController {
  constructor(private importCategoryUseCase: IImportCategory) {}

  handle(request: Request, response: Response): Response {
    const { file } = request;
    this.importCategoryUseCase.execute(file);
    return response.status(201).send();
  }
}

export { ImportCategoryController };
