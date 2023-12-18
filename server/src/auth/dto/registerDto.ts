import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Role } from '../emuns/role.enum';
import { BaseDto } from 'src/shared/config/base.dto';

export class RegisterDto extends BaseDto {
  @IsNotEmpty({ message: 'Tên đăng nhập không được để trống!' })
  username: string;

  @IsNotEmpty({ message: 'Mật khẩu không được để trống!' })
  password: string;

  @IsNotEmpty({ message: 'Nhập lại Password không được để trống!' })
  passwordCf: string;

  @IsNotEmpty({ message: 'Họ và tên không được để trống!' })
  fullName: string;

  @IsEmail({}, { message: 'Email sai định dạng' })
  @IsNotEmpty({ message: 'Email không được để trống' })
  email: string;

  @IsOptional()
  role: Role;
}
