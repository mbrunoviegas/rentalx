import csvParse from 'csv-parse';
import fs from 'fs';
import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../../shared/errors/AppError';
import { ICategoryRepository } from '../../../repositories/interfaces/ICategoryRepository';
import { IImportCategory } from '../interfaces/IImportCategory';
import { IParsedCategory } from '../interfaces/IParsedCategory';

@injectable()
class ImportCategoryUseCase implements IImportCategory {
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
