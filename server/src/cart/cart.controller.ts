import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Req,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import RoleGuard from 'src/auth/guards/role.guard';
import { Role } from 'src/auth/emuns/role.enum';
import { AddItemDto } from './dto/add-item.dto';
import { Cart } from './entities/cart.entity';
import RequestWithUser from 'src/shared/requestWithUser';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @UseGuards(JwtAuthGuard, RoleGuard(Role.User))
  @Post()
  addItemToCart(@Body() item, @Req() req:RequestWithUser): Promise<Cart> {

    return this.cartService.addItemToCart(req.user.id, item);
  }


  @UseGuards(JwtAuthGuard, RoleGuard(Role.User))
  @Get('')
  getCart(@Req() req:RequestWithUser) :Promise<Cart>{
    // return this.cartService.getCart(req.user.id);
    return this.cartService.findCartByUserId(req.user.id);
  }


  @UseGuards(JwtAuthGuard, RoleGuard(Role.User))
  @Patch()
  updateCart(@Body() item: AddItemDto, @Req() req:RequestWithUser):Promise<Cart> {
    return this.cartService.updateCart(req.user.id, item);
  }


  @UseGuards(JwtAuthGuard, RoleGuard(Role.User))
  @Delete('/:itemId')
  deleteCart(@Param('itemId') itemId: string, @Req() req:RequestWithUser):Promise<Cart> {
    return this.cartService.removeItemFromCart(itemId, req.user.id);
  }

}
