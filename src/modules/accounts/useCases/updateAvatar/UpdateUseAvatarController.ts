import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdateUseAvatarUseCase } from './implementations/UpdateUseAvatarUseCase';

class UpdateUseAvatarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;
    const user_avatar = null;
    const updateAvatarUseCase = container.resolve(UpdateUseAvatarUseCase);
    await updateAvatarUseCase.execute({ user_id, user_avatar });
    return response.status(204).send();
  }
}

export { UpdateUseAvatarController };
