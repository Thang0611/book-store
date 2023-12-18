import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Order } from 'src/order/entities/order.entity';
import { BaseEntity } from 'src/shared/config/base.entity';
import {  PaymentStatus } from '../enum/payment-status.enum';

@Entity('order_item')
export class OrderItem extends BaseEntity {
  @Column()
  bookId: string;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  image: string;

  @Column()
  initPrice: number;
  
  @Column()
  subTotalPrice: number;
  
  @Column()
  quantity: number;


  @ManyToOne('Order', (order: Order) => order.orderItems)
  @JoinColumn()
  order: Order;
}
