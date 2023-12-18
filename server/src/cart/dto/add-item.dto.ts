import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { BookEntity } from 'src/book/entities/book.entity';
import { BaseDto } from 'src/shared/config/base.dto';

export class AddItemDto extends BaseDto {
  @IsNotEmpty()
  @Expose()
  bookId: string;

  @IsNotEmpty()
  @IsNumber()
  @Expose()
  quantity: number;
}
