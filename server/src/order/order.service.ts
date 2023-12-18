import { Injectable, NotFoundException } from '@nestjs/common';

import { Repository, UpdateResult } from 'typeorm';
import { Order } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CartService } from '../cart/cart.service';
import { UserService } from '../user/user.service';

import { OrderItem } from 'src/order/entities/order-item.entity';
import { CartItemService } from 'src/cart-item/item.service';
import { OrderStatus } from './enum/order-status.enum';
import { PaymentStatus } from './enum/payment-status.enum';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
    private cartService: CartService,
    private userService: UserService,
    private itemService: CartItemService,
  ) { }
  async createOrder(userId: string): Promise<Order> {
    const cart = await this.cartService.findCartByUserId(userId);
    if (!cart) {
      throw new NotFoundException('Cart not found!');
    }
    const user = await this.userService.findCartByUserID(userId);
    const order = this.orderRepository.create();

    order.quantity = cart.totalItem;
    order.user = user;
    order.totalPrice = cart.totalPrice;
    await this.orderRepository.save(order);
    const orderItems = [];

    for (const cartItem of cart.items) {
      const orderItem = this.orderItemRepository.create();
      orderItem.order = order;
      if (cartItem.book) {
        orderItem.bookId = cartItem.book.id;
        orderItem.title = cartItem.book.title;
        orderItem.author = cartItem.book.author;
        orderItem.image = cartItem.book.image.url;
      }
      orderItem.quantity = cartItem.quantity;
      orderItem.initPrice = cartItem.initPrice;
      orderItem.subTotalPrice = cartItem.subTotalPrice;
      orderItems.push(orderItem);
    }
    await this.orderItemRepository.save(orderItems);
    await this.itemService.removeCartItem(cart.items);
    await this.cartService.removeCart(cart);
    return order;
  }

  getAllOrder(): Promise<Order[]> {
    return this.orderRepository.find({
      relations: {
        orderItems: true,
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  getOrderById(id: string): Promise<Order> {
    return this.orderRepository.findOneBy({ id })
  }

  updateStatusPayment(id: string, paymentStatus: PaymentStatus): Promise<any> {
    return this.orderRepository.update({ id }, { paymentStatus: paymentStatus })
  }

  getAllOrderByUserId(userId: string): Promise<Order[]> {
    return this.orderRepository.find({
      relations: {
        orderItems: true,
      },
      where: {
        user: {
          id: userId,
        },
      },
      order: { createdAt: 'DESC' },
    });
  }


}
