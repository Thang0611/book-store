import { Expose, Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
} from 'class-validator';
import { Role } from 'src/auth/emuns/role.enum';
import { BaseDto } from 'src/shared/config/base.dto';

export class CreateUserDto extends BaseDto {
  @Expose()
  @Length(6, 25)
  @IsNotEmpty({ message: 'Tên đăng nhập không được để trống!' })
  username: string;
  @Expose()
  @IsNotEmpty({ message: 'Mật khẩu không được để trống!' })
  password: string;
  @Expose()
  @IsNotEmpty({ message: 'Nhập lại Password không được để trống!' })
  passwordCf: string;
  @Expose()
  @IsNotEmpty({ message: 'Họ và tên không được để trống!' })
  fullName: string;
  @Expose()
  @IsEmail({}, { message: 'Email sai định dạng' })
  @IsNotEmpty({ message: 'Email không được để trống' })
  email: string;
  @Expose()
  @IsPhoneNumber('VN', { message: 'SĐT sai định dạng' })
  @IsNotEmpty({ message: 'Email không được để trống' })
  phoneNumber: string;
  @Expose()
  @IsOptional()
  role: Role;
}
