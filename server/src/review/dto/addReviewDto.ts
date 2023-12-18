import { Expose } from 'class-transformer';
import { IsNegative, IsNotEmpty, IsPositive, Max, Min } from 'class-validator';
import { BaseDto } from 'src/shared/config/base.dto';

export class AddReviewDto extends BaseDto {
  @Expose()
  @IsNotEmpty({ message: 'Sao không được để trống' })
  @IsPositive()
  @Min(1, { message: 'Số sao không hợp lệ' })
  @Max(5, { message: 'Số sao không hợp lệ' })
  star: number;
  @Expose()
  @IsNotEmpty({ message: 'Đánh giá không được để trống' })
  comment: string;
  @IsNotEmpty({ message: 'Người đánh giá không xác định' })
  @Expose()
  userId: string;
  @IsNotEmpty({ message: 'Sach không xác định' })
  @Expose()
  bookId: string;
}
