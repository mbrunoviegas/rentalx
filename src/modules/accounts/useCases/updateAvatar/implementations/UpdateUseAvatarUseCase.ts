import { inject, injectable } from 'tsyringe';
import {
  IUserRepository,
} from '@modules/accounts/repositories/IUserRepository';
import { IRequestUpdateAvatar } from '@modules/accounts/useCases/updateAvatar/dto/IRequestUpdateAvatar';
import { AppError } from '@shared/core/errors/AppError';
import { User } from '@shared/infra/database/typeorm/entities/User';
import { FileUtils } from '@shared/utils/FileUtils';

@injectable()
class UpdateUseAvatarUseCase implements IUseCase<IRequestUpdateAvatar, void> {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  private async findUser(user_id: string): Promise<User> {
    const user = await this.userRepository.findById(user_id);
    if (!user) {
      throw new AppError("User doesn't exist!", 400);
    }
    return user;
  }

  private async updateUser(user: User): Promise<void> {
    this.userRepository.create(user);
  }

  private async deleteAvatarFile(avatarFileName: string): Promise<void> {
    FileUtils.deleteFile(`./tmp/avatar/${avatarFileName}`);
  }

  async execute({ user_id, user_avatar }: IRequestUpdateAvatar): Promise<void> {
    const user = await this.findUser(user_id);
    if (user.avatar) {
      await this.deleteAvatarFile(user.avatar);
    }
    user.avatar = user_avatar;
    await this.updateUser(user);
  }
}

export { UpdateUseAvatarUseCase };
