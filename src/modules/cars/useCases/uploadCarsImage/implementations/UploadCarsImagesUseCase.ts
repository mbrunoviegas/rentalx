import { inject, injectable } from 'tsyringe';
import { ICarsImageRepository } from '@modules/cars/repositories/ICarsImageRepository';
import { ICarsRepository } from '@shared/infra/database/typeorm/repositories/ICarsRepository';
import { AppError } from '@shared/core/errors/AppError';
import { FileUtils } from '@shared/utils/FileUtils';
import { ICarsImagesRequestDTO } from '../dto/IUploadCarsImagesRequestDTO';

@injectable()
class UploadCarsImagesUseCase implements IUseCase<ICarsImagesRequestDTO, void> {
  constructor(
    @inject('CarsRepository')
      private carsRepository: ICarsRepository,
    @inject('CarsImageRepository')
    private carsImageRepository: ICarsImageRepository,
  ) { }

  private async deleteCarImages(images_name: string[]): Promise<void> {
    images_name.map(async (image_name) => {
      await FileUtils.deleteFile(`./tmp/cars/${image_name}`);
    });
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
    }

    images_name.map(async (image_name) =>
      this.carsImageRepository.create(car_id, image_name));
  }
}

export { UploadCarsImagesUseCase };
