/* eslint-disable no-useless-return */
import fs from 'fs';
import { resolve } from 'path';

export class FileUtils {
  static async deleteFile(avatarPath: string): Promise<void> {
    const filePath = resolve(__dirname, '..', '..', '..', avatarPath);
    try {
      await fs.promises.stat(filePath);
      await fs.promises.unlink(filePath);
    } catch (error) {
      return;
    }
  }
}
