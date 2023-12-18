import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BookEntity } from '../../book/entities/book.entity';
import { Exclude } from 'class-transformer';
import { BaseEntity } from 'src/shared/config/base.entity';

@Entity('image')
export class ImageEntity extends BaseEntity {
  @Column()
  public url: string;

  // @Column()
  // @Exclude()
  // public key: string;

  @OneToOne(() => BookEntity, (book) => book.image, {
    nullable: true,
  })
  book: BookEntity;
}
