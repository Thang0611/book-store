import {
  Injectable,
  HttpException,
  HttpStatus,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { BookEntity } from './entities/book.entity';
import {
  DataSource,
  EntityManager,
  ILike,
  Like,
  Repository,
  createQueryBuilder,
} from 'typeorm';
import {
  InjectRepository,
  InjectDataSource,
  InjectEntityManager,
} from '@nestjs/typeorm';

import { ImageService } from 'src/image/image.service';
import { IAM } from 'aws-sdk';
import { QueryDto } from './dto/QueryDto';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(BookEntity)
    private bookRepository: Repository<BookEntity>,
    private imageService: ImageService,
  ) { }

  async getAllBooks(query: QueryDto): Promise<BookEntity[]> {
    if (!query) {
      const book = this.bookRepository.find({
        relations: {
          image: true,
        },
        order: {
          createdAt: 'DESC',
          title: 'ASC',
        },
        select: { image: { url: true, id: false } },
      });
      return book;
    } else {
      const book = this.bookRepository.find({
        relations: {
          image: true,
        },
        select: { image: { url: true, id: false } },
        order: {
          [query.order]: query.sort,
        },
      });
      return book;
    }
  }


  detailBook(id: string): Promise<BookEntity> {
    return this.bookRepository.findOne({
      relations: {
        reviews: { user: true },
      },
      where: {
        id: id,
      },
    });
  }

  async createBook(bookDto: CreateBookDto, file: Express.Multer.File): Promise<BookEntity> {
    try {
      const image = await this.imageService.saveImg(file);
      const book = this.bookRepository.create({ ...bookDto, image });
      return this.bookRepository.save(book);
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Thêm sách thất bại!');
    }
  }

  async findBookById(id: string): Promise<BookEntity> {
    const book = await this.bookRepository.findOneBy({ id });
    if (!book) {
      throw new NotFoundException('Sách không tồn tại!');
    }
    return book;
  }

  async updateBook(id: string, bookDto: UpdateBookDto, file: Express.Multer.File,): Promise<any> {
    try {
      const book = await this.findBookById(id);
      bookDto = this.bookRepository.create(bookDto)
      const bookUpdate = {
        ...book,
        ...bookDto
      };
      if (file) {
        await this.imageService.updateImg(book.image.id, file);
      }
      bookUpdate.updatedAt = new Date();
      return this.bookRepository.update({ id }, { ...bookUpdate });
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Cập nhật sách thất bại!');
    }
  }



  async findBookByTitle(title: string): Promise<BookEntity[]> {
    const book = await this.bookRepository.find({
      relations: { image: true },
      where: {
        title: ILike(`%${title}%`),
      },
    });
    return book;
  }



  async deleteBook(id: string): Promise<any> {
    try {
      const book = await this.findBookById(id);
      return this.bookRepository.delete(id);
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Xóa sách thất bại');
    }
  }

  getBookById(id: string): Promise<BookEntity> {
    try {
      return this.bookRepository.findOne({ where: { id: id } });
    } catch (error) {
      throw new NotFoundException('Sách không tồn tại!');
    }
  }




}
