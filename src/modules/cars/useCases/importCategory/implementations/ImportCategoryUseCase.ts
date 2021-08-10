import csvParse from 'csv-parse';
import fs from 'fs';
import { inject, injectable } from 'tsyringe';
import { ICategoryRepository } from '@modules/cars/repositories/ICategoryRepository';
import { IParsedCategory } from '@modules/cars/useCases/importCategory/interfaces/IParsedCategory';
import { AppError } from '@shared/core/errors/AppError';
import { IUseCase } from '@shared/core/IUseCase';

@injectable()
class ImportCategoryUseCase implements IUseCase<Express.Multer.File, void> {
  constructor(
    @inject('CategoryRepository')
    private categoryRepository: ICategoryRepository,
  ) { }

  private loadCategories(file: Express.Multer.File): Promise<IParsedCategory[]> {
    return new Promise((resolve, reject) => {
      const readStream = fs.createReadStream(file.path);
      const categories: IParsedCategory[] = [];
      const fileParser = csvParse();

      readStream.pipe(fileParser);

      fileParser.on('data', async (line) => {
        const [name, description] = line;
        categories.push({
          name, description,
        });
      })
        .on('end', () => {
          fs.promises.unlink(file.path);
          resolve(categories);
        })
        .on('error', (error) => {
          reject(error);
        });
    });
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file);
    let atLeastOneCreated = false;
    categories.forEach(async (category) => {
      const categoryAreadyExists = await this.categoryRepository.findByName(category.name);
      if (!categoryAreadyExists) {
        atLeastOneCreated = true;
        await this.categoryRepository.create(category);
      }
    });

    if (!atLeastOneCreated) {
      throw new AppError('Some categories inside file already exists');
    }
  }
}

export { ImportCategoryUseCase };
