import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { CartModule } from 'src/cart/cart.module';
import { UserModule } from 'src/user/user.module';
import { OrderItem } from 'src/order/entities/order-item.entity';
import { ItemModule } from 'src/cart-item/cart-item.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderItem]),
    CartModule,
    UserModule,
    ItemModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
  exports:[OrderService]
})
export class OrderModule {}
