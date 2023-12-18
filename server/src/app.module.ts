import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { BookModule } from './book/book.module';
import { AuthModule } from './auth/auth.module';
import * as dotenv from 'dotenv';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageModule } from './image/image.module';
import { ReviewModule } from './review/review.module';
import { ConfigModule } from '@nestjs/config';
import { CartModule } from './cart/cart.module';
import { ItemModule } from './cart-item/cart-item.module';
import { OrderModule } from './order/order.module';

import { dataSourceOptions } from 'db/data-source';
import { VnpayModule } from './vnpay/vnpay.module';
import { AddressModule } from './address/address.module';

dotenv.config();

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(dataSourceOptions),
    BookModule,
    AuthModule,
    ImageModule,
    ReviewModule,
    OrderModule,
    CartModule,
    ItemModule,
    VnpayModule,
    AddressModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
