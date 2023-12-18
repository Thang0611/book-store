import { Module } from '@nestjs/common';
import { CartItemService } from './item.service';
import { CartItemController } from './cart-item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItem } from './entities/item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CartItem])],
  controllers: [CartItemController],
  providers: [CartItemService],
  exports: [CartItemService],
})
export class ItemModule {}
