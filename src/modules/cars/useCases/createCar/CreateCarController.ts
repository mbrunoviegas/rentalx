import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateCarUseCase } from './implementations/CreateCarUseCase';

class CreateCarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const requestProps = request.body;
    const createCarUseCase = container.resolve(CreateCarUseCase);

    const car = await createCarUseCase.execute(requestProps);

    return response.status(201).json(car);
  }
}

export { CreateCarController };
