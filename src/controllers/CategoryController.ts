import { Request, Response } from 'express';
import { BaseController } from './BaseController';

export class CategoryController {
  public create = async (request: Request, response: Response) =>
    response.status(200).json({ message: 'Essa poha de eslint foi muito chata pra configurar. Fodasse eslint.' });
}
