import { Controller, Get, Post, Param, Req, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';

import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import RoleGuard from 'src/auth/guards/role.guard';
import { Role } from 'src/auth/emuns/role.enum';
import { Order } from './entities/order.entity';
import RequestWithUser from 'src/shared/requestWithUser';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(JwtAuthGuard, RoleGuard(Role.User))
  @Post()
  createOrder(@Req() req:RequestWithUser): Promise<Order> {
    return this.orderService.createOrder(req.user.id);
  }

  @UseGuards(JwtAuthGuard, RoleGuard(Role.Admin))
  @Get('admin')
  getAllOrder(): Promise<Order[]> {
    return this.orderService.getAllOrder();
  }

  @UseGuards(JwtAuthGuard, RoleGuard(Role.User))
  @Get('')
  getAllOrderByUser(@Req() req:RequestWithUser) : Promise<Order[]>{
    return this.orderService.getAllOrderByUserId(req.user.id);
  }


}
  