import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UploadCarsImagesUseCase } from './implementations/UploadCarsImagesUseCase';

interface IFile {
  filename: string
}

class UploadCarsImagesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const images = request.files as IFile[];

    const uploadCarsImagesUseCase = container.resolve(UploadCarsImagesUseCase);

    const images_name = images.map((file) =>
      file.filename);

    await uploadCarsImagesUseCase.execute({ car_id: id, images_name });

    return response.status(201).send();
  }
}

export { UploadCarsImagesController };
