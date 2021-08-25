import fs from 'fs';
import { resolve } from 'path';
import upload from '@shared/config/upload';

import { AppError } from '@shared/core/errors/AppError';
import { IStorageProvider } from '../IStorageProvider';

class LocalStorageProvider implements IStorageProvider {
  async save(file: string, folder: string): Promise<string> {
    await fs.promises.rename(
      resolve(upload.tmpFolder, file),
      resolve(`${upload.tmpFolder}/${folder}`, file),
    );

    return file;
  }

  async delete(file: string, folder: string): Promise<void> {
    const fileName = resolve(`${upload.tmpFolder}/${folder}`, file);

    try {
      await fs.promises.stat(fileName);
      await fs.promises.unlink(fileName);
    } catch (error) {
      console.log(error);
      throw new AppError('Error when trying to delete avatar file locally', 500);
    }
  }
}

export { LocalStorageProvider };
