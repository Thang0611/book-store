import { IsNotEmpty } from 'class-validator';
import { BaseDto } from 'src/shared/config/base.dto';

export class loginDto extends BaseDto {
  @IsNotEmpty({ message: 'Tên đăng nhập không được để trống' })
  username: string;

  @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
  password: string;
}
