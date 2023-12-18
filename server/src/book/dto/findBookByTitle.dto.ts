import { IsNotEmpty } from 'class-validator';

export class findBookByTitleDto {
  @IsNotEmpty({ message: 'Tiêu đề không được để trống' })
  title: string;
}
