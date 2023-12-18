import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class QueryDto {
  @IsOptional()
  @Exclude()
  order: string;

  @IsOptional()
  @Exclude()
  sort: string;
}
