import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { CartItem } from './entities/item.entity';
import { DataSource, Repository } from 'typeorm';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { AddItemDto } from 'src/cart/dto/add-item.dto';

@Injectable()
export class CartItemService {
  constructor(
    @InjectRepository(CartItem)
    private cartItemRepository: Repository<CartItem>,
    @InjectDataSource() private dataSource: DataSource,
  ) {}

  findCartItemById(id:string): Promise<CartItem> {
    return this.cartItemRepository.findOne({ where: { id } });
  }

  updateItem(id: string, cartItem: CartItem): Promise<any> {
    return this.cartItemRepository.update(id, cartItem);
  }

  removeItem(id: string): Promise<any> {
    return this.cartItemRepository.delete(id);
  }


  createCartItem(item: CreateItemDto): Promise<CartItem> {
    const newItem = this.cartItemRepository.create(item);
    return this.cartItemRepository.save(newItem);
  }

  removeCartItem(item: CartItem[]): Promise<any> {
    return this.cartItemRepository.remove(item);
  }

  async getListItem(cartId: string): Promise<CartItem[]> {
    const listItem = await this.dataSource
      .createQueryBuilder(CartItem, 'cart_item')
      .leftJoinAndSelect('cart_item.cart', 'cart')
      .leftJoinAndSelect('cart_item.book', 'book')
      .select(['cart_item', 'book'])
      .where('cart.id =:cartId', { cartId })
      .getMany();
    return listItem;
  }
}
