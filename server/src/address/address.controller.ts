import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import RoleGuard from 'src/auth/guards/role.guard';
import { Role } from 'src/auth/emuns/role.enum';
import RequestWithUser from 'src/shared/requestWithUser';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getAddress(@Req()req:RequestWithUser) {
    return this.addressService.getAddress(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createAddressDto: CreateAddressDto,@Req()req:RequestWithUser) {
    return this.addressService.create(req.user.id,createAddressDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch( )
  update(@Req()req:RequestWithUser, @Body() updateAddressDto: UpdateAddressDto) {
    return this.addressService.update(req.user.id, updateAddressDto);
  }

}
