import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { DataSource, Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';

import { BookService } from 'src/book/book.service';
import { CartItemService } from 'src/cart-item/item.service';
import { UserEntity } from 'src/user/entities/user.entity';
import { UpdateItemDto } from './dto/update-item-dto';
import { AddItemDto } from './dto/add-item.dto';
import { use } from 'passport';

@Injectable()
export class CartService {
  constructor(
    private userService: UserService,
    private bookService: BookService,
    private itemService: CartItemService,
    @InjectDataSource() private dataSource: DataSource,
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
  ) { }

  async getCart(userId: string) {
    const cart = await this.cartRepository.findOne({
      relations: {
        items: {
          book: {
            image: true,
          },
        },
      },
      where: {
        user: { id: userId },
      },
    });
    return cart;
  }

  async addItemToCart(userId: string, item: AddItemDto): Promise<Cart> {
    try {
      const book = await this.bookService.getBookById(item.bookId);
      const user = await this.userService.findUserById(userId);
      let cart = await this.findCartByUserId(userId);
      const initPrice = book.price;
      const pricePlus = book.price * item.quantity;
      if (!cart) {
        cart = await this.createCart(user);
        cart.items = [];
      }
      const cartItem = cart?.items?.find((i) => i.book?.id === item.bookId);
      if (cartItem) {
        //if item exist => update quantity ,subtotalPrice Item
        if (cartItem.quantity + item.quantity > book.quantity) {
          throw new BadRequestException('Số lượng sách còn lại không đủ');
        }
        cartItem.quantity += item.quantity;
        cartItem.initPrice = initPrice;
        cartItem.subTotalPrice = cartItem.subTotalPrice + pricePlus;
        cartItem.book = book;
        await this.itemService.updateItem(cartItem.id, cartItem);
      } else {
        if (item.quantity > book.quantity) {
          throw new BadRequestException('Số lượng sách còn lại không đủ');
        }
        await this.itemService.createCartItem({
          cart,
          book,
          subTotalPrice: pricePlus,
          quantity: item.quantity,
          initPrice: book.price,
        });
      }
      const listCartItem = await this.itemService.getListItem(cart.id);
      cart.items = listCartItem;
      const totalItem = this.calculateTotalItem(cart);
      const totalPrice = this.calculateTotalPrice(cart, initPrice);
      cart.totalPrice = totalPrice;
      cart.totalItem = totalItem;
      // //update cart
      const newCart = await this.cartRepository.save(cart);
      delete newCart.user;
      return newCart;
    } catch (error) {
      console.log(error?.message);
      throw new BadRequestException(error?.message || 'Có lỗi xảy ra');
    }
  }

  async updateCart(userId: string, item: UpdateItemDto): Promise<Cart> {
    const book = await this.bookService.findBookById(item.bookId);
    const cart = await this.findCartByUserId(userId);
    if (!cart.items) {
      cart.items = [];
    }
    const cartItem = cart?.items?.find((i) => i.book.id === item.bookId);
    cartItem.quantity = item.quantity;
    await this.itemService.updateItem(cartItem.id, cartItem);
    const listItem = await this.itemService.getListItem(cart.id);
    cart.items = listItem;
    cart.totalPrice = this.calculateTotalPrice(cart, book.price);
    cart.totalItem = this.calculateTotalItem(cart);
    const newCart = await this.cartRepository.save(cart);
    return newCart;
  }

  async removeItemFromCart(itemId: string, userId): Promise<Cart> {
    const cartItem = await this.itemService.findCartItemById(itemId);
    const cart = await this.findCartByUserId(userId);
    if (!cartItem) {
      throw new BadRequestException('Sách không tồn tại');
    }
    await this.itemService.removeItem(cartItem.id);
    const listItem = await this.itemService.getListItem(cart.id);
    cart.items = listItem;
    cart.totalItem = this.calculateTotalItem(cart);
    cart.totalPrice = this.calculateTotalPrice(cart, cartItem.initPrice);
    return this.cartRepository.save(cart);
  }

  removeCart(cart: Cart) {
    return this.cartRepository.remove(cart);
  }

  calculateTotalPrice(cart: Cart, initPrice: number): number {
    const items = cart?.items;
    const result = items?.reduce((total, item) => {
      return total + item.subTotalPrice;
    }, 0);
    return result;
  }

  calculateTotalItem(cart: Cart): number {
    const items = cart?.items;
    const result = items?.reduce((total, item) => {
      return total + item.quantity;
    }, 0);
    return result;
  }

  createCart(user: UserEntity): Promise<Cart> {
    const cart = this.cartRepository.create();
    cart.user = user;
    return this.cartRepository.save(cart);
  }

  async findCartByUserId(userId: string): Promise<Cart> {
    const cart = await this.dataSource
      .createQueryBuilder(Cart, 'cart')
      .leftJoinAndSelect('cart.user', 'user')
      .leftJoinAndSelect('cart.items', 'cart_items')
      .leftJoinAndSelect('cart_items.book', 'book')
      .leftJoinAndSelect('book.image', 'image')
      .select(['cart', 'cart_items', 'book', 'image.url'])
      .where('user.id =:userId', { userId })
      .getOne();
    return cart;
  }

}
