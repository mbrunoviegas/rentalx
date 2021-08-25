import { inject, injectable } from 'tsyringe';
import { IRequestUpdateAvatar } from '@modules/accounts/useCases/updateAvatar/dto/IRequestUpdateAvatar';
import { AppError } from '@shared/core/errors/AppError';
import { IUseCase } from '@shared/core/IUseCase';
import { IStorageProvider } from '@shared/core/providers/IStorageProvider';
import { User } from '@shared/infra/database/typeorm/entities/User';
import {
  IUserRepository,
} from '@shared/infra/database/typeorm/repositories/IUserRepository';

@injectable()
class UpdateUseAvatarUseCase implements IUseCase<IRequestUpdateAvatar, void> {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) { }

  private AVATAR_FOLDER = 'avatar';

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
    await this.storageProvider.delete(avatarFileName, this.AVATAR_FOLDER);
  }

  private async saveAvatarFile(avatarFile: string): Promise<void> {
    await this.storageProvider.save(avatarFile, this.AVATAR_FOLDER);
  }

  async execute({ user_id, user_avatar }: IRequestUpdateAvatar): Promise<void> {
    const user = await this.findUser(user_id);
    await this.saveAvatarFile(user_avatar);

    if (user.avatar) {
      await this.deleteAvatarFile(user.avatar);
    }

    user.avatar = user_avatar;

    await this.updateUser(user);
  }
}

export { UpdateUseAvatarUseCase };
