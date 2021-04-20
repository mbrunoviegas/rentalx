import { IRequestUpdateAvatar } from '../dto/IRequestUpdateAvatar';

class UpdateUseAvatarUseCase implements IUseCase<IRequestUpdateAvatar, void> {
  async execute(requestProps: IRequestUpdateAvatar): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

export { UpdateUseAvatarUseCase };
