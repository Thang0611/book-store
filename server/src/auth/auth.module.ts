import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { LocalStrategy } from './strategies/local.strategy';
// import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';

import { JwtStrategy } from './strategies/jwt.strategy';
import { LoginValidateMiddleware } from 'src/middleware/loginValidate.middleware';
import { UserEntity } from 'src/user/entities/user.entity';
// import { RefreshStrategy } from './strategies/refresh.stategy';

@Module({
  imports: [
    UserEntity,
    PassportModule,
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    // RefreshStrategy
  ],
  controllers: [AuthController],
  exports: [],
}) 
export class AuthModule {}
