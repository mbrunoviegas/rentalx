import { S3 } from 'aws-sdk';
import fs from 'fs';
import mime from 'mime';
import { resolve } from 'path';
import upload from '@shared/config/upload';
import { IStorageProvider } from '../IStorageProvider';

class S3AwsProvider implements IStorageProvider {
  private s3Client: S3;

  constructor() {
    this.s3Client = new S3({
      region: process.env.AWS_BUCKET_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_ACCESS_SECRET_KEY,
      },
    });
  }

  async save(file: string, folder: string): Promise<string> {
    const originalFilePath = resolve(upload.tmpFolder, file);
    const fileContent = await fs.promises.readFile(originalFilePath);

    const contentType = mime.getType(originalFilePath);

    await this.s3Client.putObject({
      Bucket: `${process.env.AWS_BUCKET}/${folder}`,
      Key: file,
      ACL: 'public-read',
      Body: fileContent,
      ContentType: contentType,
    }).promise();

    await fs.promises.unlink(originalFilePath);

    return file;
  }

  async delete(file: string, folder: string): Promise<void> {
    await this.s3Client.deleteObject({
      Bucket: `${process.env.AWS_BUCKET}/${folder}`,
      Key: file,
    }).promise();
  }
}

export { S3AwsProvider };
