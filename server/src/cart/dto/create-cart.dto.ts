import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsPositive, Min } from 'class-validator';
import { CartItem } from 'src/cart-item/entities/item.entity';
import { BaseDto } from 'src/shared/config/base.dto';
import { UserEntity } from 'src/user/entities/user.entity';

export class CreateCartDto extends BaseDto {
  @IsNotEmpty()
  @Min(0)
  @Exclude()
  totalPrice: number;

  @IsNotEmpty()
  @Exclude()
  items: CartItem[];

  @IsNotEmpty()
  @Exclude()
  user: UserEntity;
}
