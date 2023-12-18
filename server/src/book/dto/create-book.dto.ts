import { Exclude, Expose, Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsPositive, Min } from 'class-validator';

import Category from '../enum/Category.enum';
import { ImageEntity } from 'src/image/entities/image.entity';
import { BaseDto } from 'src/shared/config/base.dto';

export class CreateBookDto extends BaseDto {
  @IsNotEmpty({ message: 'Tiêu đề không được để trống' })
  @Expose()
  title: string;

  @IsNotEmpty({ message: 'Tác giả không được để trống' })
  @Expose()
  author: string;

  @IsNotEmpty({ message: 'Thể loại không được để trống' })
  @Expose()
  category: Category;

  @IsNotEmpty({ message: 'Nhà xuất bản không được để trống' })
  @Expose()
  publisher: string;

  @Type(() => Date)
  @IsDate({ message: 'Ngày sai định dạng' })
  @IsNotEmpty({ message: 'Ngày xuất bản không được để trống' })
  @Expose()
  date: Date;

  @Type(() => Number)
  @Min(0)
  @IsNotEmpty({ message: 'Số trang không được để trống' })
  @Expose()
  numOfPage: number;

  @Type(() => Number)
  @Min(0)
  @IsNotEmpty({ message: 'Số trang không được để trống' })
  @Expose()
  price: number;

  @IsNotEmpty({ message: 'Mô tả không được để trống' })
  @Expose()
  description: string;

  @Type(() => Number)
  @IsNotEmpty({ message: 'Số lượng không được để trống' })
  @Expose()
  @Min(0)
  quantity: number;

  @Expose()
  image?: ImageEntity;
}
