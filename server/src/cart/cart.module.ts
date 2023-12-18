import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { UserController } from 'src/user/user.controller';
import { UserModule } from 'src/user/user.module';
import { BookModule } from 'src/book/book.module';

import { CartItem } from 'src/cart-item/entities/item.entity';
import { ItemModule } from 'src/cart-item/cart-item.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cart, CartItem]),
    UserModule,
    BookModule,
    ItemModule,
  ],
  controllers: [CartController],
  providers: [CartService],
  exports: [CartService],
})
export class CartModule {}
