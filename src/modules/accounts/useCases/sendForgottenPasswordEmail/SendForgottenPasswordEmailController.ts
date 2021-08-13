import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { SendForgottenPasswordEmailUseCase } from './implementations/SendForgottenPasswordEmailUseCase';

class SendForgottenPasswordEmailController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const sendForgottenPasswordEmailUseCase = container.resolve(SendForgottenPasswordEmailUseCase);

    await sendForgottenPasswordEmailUseCase.execute(email);

    return response.status(200).send();
  }
}

export { SendForgottenPasswordEmailController };
