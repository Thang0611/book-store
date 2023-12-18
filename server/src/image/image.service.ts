import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { S3 } from 'aws-sdk';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { ImageEntity } from './entities/image.entity';
import * as dotenv from 'dotenv';
import { imageDto } from './dto/image.dto';
import { v2 } from 'cloudinary';
import { CloudinaryResponse } from './cloudinary-response';
import toStream = require('buffer-to-stream');
dotenv.config();

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(ImageEntity)
    private readonly imgRepository: Repository<ImageEntity>,
  ) { }

  async uploadPublicFile(file: Express.Multer.File): Promise<string> {
    const image = await new Promise<CloudinaryResponse>((resolve, reject) => {
      const uploadStream = v2.uploader.upload_stream((error, result) => {
        if (error) {
          console.log(error);
          return reject(error);
        }
        resolve(result);
      });
      toStream(file.buffer).pipe(uploadStream);
    });
    return image.url;
  }

  deleteImg(id: string): Promise<any> {
    return this.imgRepository.delete(id);
  }

  async saveImg(file: Express.Multer.File): Promise<ImageEntity> {
    const url = await this.uploadPublicFile(file);
    const newImage = this.imgRepository.create();
    newImage.url = url;
    try {
      const image = await this.imgRepository.save(newImage);
      return image;
    } catch (error) {
      throw new BadRequestException('Lưu ảnh thất bại');
    }
  }

  async updateImg(id: string, file: Express.Multer.File): Promise<any> {
    const url = await this.uploadPublicFile(file);
    return this.imgRepository.update({ id: id }, { url });
  }



  async findById(id: string): Promise<ImageEntity> {
    return await this.imgRepository.findOne({ where: { id } });
  }

  async findByBookId(bookId: string): Promise<ImageEntity> {
    return this.imgRepository.findOne({
      relations: { book: true },
      where: {
        book: { id: bookId },
      },
      select: { url: true, id: true },
    });
  }
}
