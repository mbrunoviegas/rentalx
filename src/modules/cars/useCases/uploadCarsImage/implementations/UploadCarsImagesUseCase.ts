import { inject, injectable } from 'tsyringe';
import { ICarsImageRepository } from '@modules/cars/repositories/ICarsImageRepository';
import { AppError } from '@shared/core/errors/AppError';
import { IUseCase } from '@shared/core/IUseCase';
import { IStorageProvider } from '@shared/core/providers/IStorageProvider';
import { ICarsRepository } from '@shared/infra/database/typeorm/repositories/ICarsRepository';
import { ICarsImagesRequestDTO } from '../dto/IUploadCarsImagesRequestDTO';

@injectable()
class UploadCarsImagesUseCase implements IUseCase<ICarsImagesRequestDTO, void> {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
    @inject('CarsImageRepository')
    private carsImageRepository: ICarsImageRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) { }

  private CARS_FOLDER = 'cars';

  private async deleteCarImages(images_name: string[]): Promise<void> {
    await Promise.all(images_name.map(async (image_name) => {
      await this.storageProvider.delete(image_name, this.CARS_FOLDER);
    }));
  }

  async execute({ car_id, images_name }: ICarsImagesRequestDTO): Promise<void> {
    const carAlreadyExists = await this.carsRepository.findById(car_id);

    if (!carAlreadyExists) {
      throw new AppError('Car does not exist!');
    }

    const existentImages = await this.carsImageRepository.findByCarId(car_id);

    if (existentImages.length) {
      const existentImagesNames = existentImages.map((existentImage) =>
        existentImage.image_name);
      await this.deleteCarImages(existentImagesNames);
      await this.carsImageRepository.deleteByCarId(car_id);
    }

    await Promise.all(images_name.map(async (image_name) => {
      await this.carsImageRepository.create(car_id, image_name);
      await this.storageProvider.save(image_name, this.CARS_FOLDER);
    }));
  }
}

export { UploadCarsImagesUseCase };
