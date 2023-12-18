import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { UserEntity } from 'src/user/entities/user.entity';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) { }

  async validateUser(username: string, password: string): Promise<UserEntity> {
    const user = await this.userService.findUserByUserName(username);
    if (user) {
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (isPasswordMatch) return user;
    }
    return null;
  }
  login(user: UserEntity) {
    const payload = {
      id: user.id,
      username: user.username,
      fullName: user.fullName,
      role: user.role,
      email: user.email,
      phoneNumber: user.phoneNumber
    };
    return {
      ...payload,
      accessToken: this.jwtService.sign(payload),
    };
  }
}
