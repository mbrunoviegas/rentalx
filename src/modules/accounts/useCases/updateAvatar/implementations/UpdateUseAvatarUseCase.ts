import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../../shared/errors/AppError';
import { IUserRepository } from '../../../repositories/interfaces/IUserRepository';
import { IRequestUpdateAvatar } from '../dto/IRequestUpdateAvatar';

@injectable()
class UpdateUseAvatarUseCase implements IUseCase<IRequestUpdateAvatar, void> {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUserRepository,
  ) {}
  async execute({ user_id, user_avatar }: IRequestUpdateAvatar): Promise<void> {
    const user = await this.userRepository.findById(user_id);
    if (!user) {
      throw new AppError("User doesn't exist!", 400);
    }

    user.avatar = user_avatar;
  }
}

export { UpdateUseAvatarUseCase };
