import { Controller, Post, Next, Res, Req, Get, UseGuards } from '@nestjs/common';
import { VnpayService } from './vnpay.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import RequestWithUser from 'src/shared/requestWithUser';
import RoleGuard from 'src/auth/guards/role.guard';
import { Role } from 'src/auth/emuns/role.enum';
import { Response } from 'express';


@Controller('vnpay')
export class VnpayController {
  constructor(private readonly vnpayService: VnpayService) { }

  @Post('create_payment_url')
  @UseGuards(JwtAuthGuard)
  async createPaymentURL(@Req() req: RequestWithUser, @Res({ passthrough: true }) res: Response) {
    const vnpUrl = await this.vnpayService.createPaymentURL(req, res)
    return vnpUrl
  }

  // @UseGuards(JwtAuthGuard)
  @Get('vnpay_ipn')
  vnpayIpn(@Req() req: Request, @Res({ passthrough: true }) res: Response,) {
    return this.vnpayService.vpnIpn(req, res)

  }

  // @UseGuards(JwtAuthGuard, RoleGuard(Role.User))
  @Get('vnpay_return')
  vnpayReturn(@Req() req: RequestWithUser, @Res({ passthrough: true }) res: Response) {
    return this.vnpayService.vnpayReturn(req, res)
  }
}
