import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { BaseDto } from 'src/shared/config/base.dto';

export class imageDto extends BaseDto {
  @IsString()
  @Expose()
  url: string;

  // @IsString()
  // @Exclude()
  // key: string;
}
