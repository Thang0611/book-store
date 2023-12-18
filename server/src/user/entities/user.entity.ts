import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Role } from 'src/auth/emuns/role.enum';
import { ReviewEntity } from '../../review/entities/review.entity';
import { Exclude } from 'class-transformer';
import { Cart } from 'src/cart/entities/cart.entity';
import { Order } from 'src/order/entities/order.entity';
import { BaseEntity } from 'src/shared/config/base.entity';
import { Address } from 'src/address/entities/address.entity';

@Entity('user')
export class UserEntity extends BaseEntity {
  @Column()
  username: string;
  @Column()
  @Exclude()
  password: string;

  @Column()
  fullName: string;

  @Column()
  email: string;

  @Column()
  phoneNumber:string

  @OneToMany(() => Order, (order: Order) => order.user, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  order: Order[];

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.User,
  })
  public role: Role;

  @OneToMany(() => ReviewEntity, (review: ReviewEntity) => review.user)
  review: ReviewEntity[];

  @OneToOne(() => Cart, (cart: Cart) => cart.user) cart: Cart;

  @OneToOne(()=>Address,address=>address.user)
  @JoinColumn()
  address:Address
}
