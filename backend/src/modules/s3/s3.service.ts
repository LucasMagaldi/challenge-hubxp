import { Injectable } from '@nestjs/common';
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  HeadBucketCommand,
  CreateBucketCommand,
} from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class S3Service {
  private readonly s3Client: S3Client;
  private readonly bucketName = process.env.S3_BUCKET_NAME;

  constructor() {
    this.s3Client = new S3Client({
      endpoint: process.env.S3_ENDPOINT,
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
      forcePathStyle: true,
    });
    this.ensureBucketExists(); // cria o bucket e vrifica
  }

  private async ensureBucketExists() {
    try {
      await this.s3Client.send(
        new HeadBucketCommand({ Bucket: this.bucketName }),
      );
      console.log(`Bucket ${this.bucketName} already exists`);
    } catch (error) {
      console.log(`Bucket ${this.bucketName} does not exist. Creating...`);
      await this.s3Client.send(
        new CreateBucketCommand({ Bucket: this.bucketName }),
      );
      console.log(`Bucket ${this.bucketName} created successfully`);
    }
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const fileKey = `${uuidv4()}-${file.originalname}`;
    const params = {
      Bucket: this.bucketName,
      Key: fileKey,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    await this.s3Client.send(new PutObjectCommand(params));
    return `http://localhost:4566/${this.bucketName}/${fileKey}`;
  }

  async getFileUrl(fileKey: string): Promise<string> {
    const params = {
      Bucket: this.bucketName,
      Key: fileKey,
    };

    const command = new GetObjectCommand(params);
    await this.s3Client.send(command);
    return `${process.env.S3_ENDPOINT}/${this.bucketName}/${fileKey}`;
  }
}
