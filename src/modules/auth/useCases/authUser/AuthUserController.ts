import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { IResponseAuth } from './dto/IResponseAuth';
import { AuthUserUseCase } from './implementations/AuthUserUseCase';

class AuthUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const authUserUseCase: AuthUserUseCase = container.resolve(AuthUserUseCase);
    const authResponse: IResponseAuth = await authUserUseCase.execute({ email, password });
    return response.status(200).json(authResponse);
  }
}

export { AuthUserController };
