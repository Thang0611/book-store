import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BookEntity } from 'src/book/entities/book.entity';
import { Cart } from 'src/cart/entities/cart.entity';
import { BaseEntity } from 'src/shared/config/base.entity';

@Entity('cart_item')
export class CartItem extends BaseEntity {
  @Column()
  subTotalPrice: number;
  @Column()
  quantity: number;
  @Column()
  initPrice: number;

  @ManyToOne(() => BookEntity, (book: BookEntity) => book.items, 
  // {
  //   eager: false,
  //   // onDelete: 'CASCADE',
  // }
  )
  @JoinColumn()
  book: BookEntity;
  @ManyToOne(() => Cart, (cart: Cart) => cart.items, {})
  @JoinColumn()
  cart: Cart;
}
