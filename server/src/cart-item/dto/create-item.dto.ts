import { Exclude } from 'class-transformer';
import { IsNotEmpty, Min } from 'class-validator';
import { BookEntity } from 'src/book/entities/book.entity';
import { Cart } from 'src/cart/entities/cart.entity';
import { BaseDto } from 'src/shared/config/base.dto';

export class CreateItemDto {
  @IsNotEmpty()
  @Exclude()
  cart: Cart;

  @IsNotEmpty()
  @Exclude()
  book: BookEntity;

  @IsNotEmpty()
  @Min(0)
  @Exclude()
  initPrice: number;

  @IsNotEmpty()
  @Min(0)
  @Exclude()
  subTotalPrice: number;

  @IsNotEmpty()
  @Min(0)
  @Exclude()
  quantity: number;
}
