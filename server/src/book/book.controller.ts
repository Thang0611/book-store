import {
  Controller,
  Get,
  Body,
  Delete,
  UseGuards,
  Res,
  ParseFilePipe,
  FileTypeValidator,
} from '@nestjs/common';
import { BookService } from './book.service';
import { Param, Patch, Post } from '@nestjs/common/decorators';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { UseInterceptors } from '@nestjs/common/decorators/core/use-interceptors.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  Query,
  Req,
  UploadedFile,
} from '@nestjs/common/decorators/http/route-params.decorator';
import { Express } from 'express';

import { Role } from 'src/auth/emuns/role.enum';
import RoleGuard from 'src/auth/guards/role.guard';
import { QueryDto } from './dto/QueryDto';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { findBookByTitleDto } from './dto/findBookByTitle.dto';
import { BookEntity } from './entities/book.entity';
@Controller('book')
export class BookController {
  constructor(private bookService: BookService) {}

  @Get()
  getAllBooks(@Query() query: QueryDto) :Promise<BookEntity[]>{
    return this.bookService.getAllBooks(query);
  }

  @Get('find')
   getBookByTitle(@Query('title') title: string):Promise<BookEntity[]> {
    return  this.bookService.findBookByTitle(title);
  }

  @Get('/:id')
  detailBook(@Param() params: { id: string }) {
    return this.bookService.detailBook(params.id);
  }

  @UseGuards(JwtAuthGuard, RoleGuard(Role.Admin))
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async addBook(
    @Body() bookDto: CreateBookDto,

    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' })],
        fileIsRequired: true,
      }),
    )
    image: Express.Multer.File,
  ): Promise<BookEntity> {
    return this.bookService.createBook(bookDto, image);
  }

  @UseGuards(JwtAuthGuard, RoleGuard(Role.Admin))
  @Patch('/:id')
  @UseInterceptors(FileInterceptor('image'))
  async updateBook(
    @Param() params: { id: string },
    @Body() bookDto: UpdateBookDto,
    @UploadedFile()
    image: Express.Multer.File,
  ):Promise<any> {
    return this.bookService.updateBook(params.id, bookDto, image);
  }
  @Delete('/:id')
  @UseGuards(JwtAuthGuard, RoleGuard(Role.Admin))
  async deleteBook(@Param() params: { id: string }):Promise<any> {
    return this.bookService.deleteBook(params.id);
  }
}
