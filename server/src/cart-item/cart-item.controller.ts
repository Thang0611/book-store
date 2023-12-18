import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CartItemService } from './item.service';

@Controller('cart_item')
export class CartItemController {
  constructor(private readonly itemService: CartItemService) {}
}
