import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity } from './entities/book.entity';
import { ImageModule } from '../image/image.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([BookEntity]), ImageModule, UserModule],
  providers: [BookService],
  controllers: [BookController],
  exports: [BookService],
})
export class BookModule {}
