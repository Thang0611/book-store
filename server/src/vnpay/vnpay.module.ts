import { Module } from '@nestjs/common';
import { VnpayService } from './vnpay.service';
import { VnpayController } from './vnpay.controller';
import { ConfigService } from 'aws-sdk';
import { ConfigModule } from '@nestjs/config';
import { OrderModule } from 'src/order/order.module';

@Module({
  imports:[ConfigModule.forRoot(),OrderModule],
  controllers: [VnpayController,],
  providers: [VnpayService]
})
export class VnpayModule {}
