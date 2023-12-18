import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { CartItem } from 'src/cart-item/entities/item.entity';
import { BaseEntity } from 'src/shared/config/base.entity';

@Entity('cart')
export class Cart extends BaseEntity {
  @Column({ nullable: true })
  totalPrice: number;

  @Column({ nullable: true })
  totalItem: number;

  @OneToMany(() => CartItem, (item: CartItem) => item.cart, {
    onDelete: 'CASCADE',
  })
  items: CartItem[];

  @OneToOne(() => UserEntity, (user: UserEntity) => user.cart)
  @JoinColumn()
  user: UserEntity;
}
