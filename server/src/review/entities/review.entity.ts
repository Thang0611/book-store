import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToOne,
  CreateDateColumn,
} from 'typeorm';
import { BookEntity } from '../../book/entities/book.entity';

import { Exclude } from 'class-transformer';
import { UserEntity } from 'src/user/entities/user.entity';
import { BaseEntity } from 'src/shared/config/base.entity';

@Entity('review')
export class ReviewEntity extends BaseEntity {
  @Column()
  star: number;
  @Column()
  comment: string;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.review, {
    onDelete: 'SET NULL',
    // eager: true,
  })
  @JoinColumn()
  user: UserEntity;

  @ManyToOne(() => BookEntity, (book) => book.reviews, {
    onDelete: 'SET NULL',
    // eager:true,
  })
  @JoinColumn()
  book: BookEntity;
}
