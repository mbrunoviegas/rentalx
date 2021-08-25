import { IStorageProvider } from '../IStorageProvider';

class S3AwsProvider implements IStorageProvider {
  save(file: string, folder: string): Promise<string> {
    throw new Error('Method not implemented.');
  }
  delete(file: string, folder: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

export { S3AwsProvider };
