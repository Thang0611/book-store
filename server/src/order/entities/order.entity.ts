import { OrderItem } from 'src/order/entities/order-item.entity';
import { UserEntity } from 'src/user/entities/user.entity';

import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { OrderStatus } from '../enum/order-status.enum';
import { BaseEntity } from 'src/shared/config/base.entity';
import { PaymentStatus } from '../enum/payment-status.enum';

@Entity('order')
export class Order extends BaseEntity {
  @Column()
  quantity: number;

  @Column()
  totalPrice: number;
  // @Column({ default: OrderStatus.pending })
  // status: OrderStatus;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.order, {
    // eager: true,
  })
  @JoinColumn()
  user: UserEntity;

  @Column({default:PaymentStatus.Pending})
  paymentStatus:PaymentStatus
  @OneToMany('OrderItem', (orderItem: OrderItem) => orderItem.order, {
    // eager: false,
  })
  orderItems: OrderItem[];
}
