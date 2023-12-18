import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
  Patch,
  Param,
  Req,
  UseGuards,
  Get,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import RoleGuard from 'src/auth/guards/role.guard';
import { Role } from 'src/auth/emuns/role.enum';
import RequestWithUser from 'src/shared/requestWithUser';
@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private userService: UserService) { }

  @Post('/register')
  async register(@Body() userDto: CreateUserDto): Promise<UserEntity> {
    const user = CreateUserDto.plainToClass(userDto);
    return this.userService.createUser(user);
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  UpdateUser(@Body() updateUserDto: UpdateUserDto, @Req() req: RequestWithUser): Promise<any> {
    return this.userService.updateUser(req.user.id, updateUserDto)
  }

  @Get()
  getAllUser() {
    return this.userService.getAllUser()
  }
}
