import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageEntity } from './entities/image.entity';
import { CloudinaryProvider } from './cloudinary.provider';
@Module({
  imports: [TypeOrmModule.forFeature([ImageEntity])],
  providers: [ImageService, CloudinaryProvider],
  controllers: [ImageController],
  exports: [ImageService, CloudinaryProvider],
})
export class ImageModule {}
