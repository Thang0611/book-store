import { ReviewEntity } from 'src/review/entities/review.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ImageEntity } from '../../image/entities/image.entity';
import { OrderItem } from 'src/order/entities/order-item.entity';
import { CartItem } from 'src/cart-item/entities/item.entity';
import Category from '../enum/Category.enum';
import { BaseEntity } from 'src/shared/config/base.entity';
@Entity('book')
export class BookEntity extends BaseEntity {
  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  category: Category;

  @Column()
  publisher: string;

  @Column('date')
  date: Date;

  @Column({})
  numOfPage: number;

  @Column()
  price: number;

  @Column()
  description: string;

  @Column()
  quantity: number;

  @OneToOne(() => ImageEntity, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  public image: ImageEntity;

  @OneToMany(() => ReviewEntity, (evaluate) => evaluate.book, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  public reviews?: ReviewEntity[];


  @OneToMany(() => CartItem, (item: CartItem) => item.book)
  items: CartItem[];
}
