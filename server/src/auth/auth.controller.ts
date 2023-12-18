import {
  Controller,
  Request,
  Post,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
  Response,
} from '@nestjs/common';

import { AuthService } from './auth.service';

import { LocalAuthGuard } from './guards/local.guard';
import RequestWithUser from '../shared/requestWithUser';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  login(@Request() req: RequestWithUser, @Response({ passthrough: true }) res) {
    const user = this.authService.login(req.user);
    const accessToken = user.accessToken
    res.cookie('accessToken', accessToken, {
      expires: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
      sameSite: 'strict',
      httpOnly: true,
    });
    return user
  }
}
