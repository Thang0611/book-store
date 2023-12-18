import { Expose, plainToClass } from 'class-transformer';

export class BaseDto {
  @Expose()
  id: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  static plainToClass<T>(this: new (...args: string[]) => T, obj: T) {
    return plainToClass(this, obj, { excludeExtraneousValues: true });
  }
}
