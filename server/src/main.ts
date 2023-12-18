import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { config } from 'aws-sdk';
import { HttpExceptionFilter } from './shared/exception/http-exception';
import { TransformInterceptor } from './transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  app.useGlobalFilters(new HttpExceptionFilter());
  app.use(cookieParser());

  app.enableCors({
    origin: [
      'http://localhost:3001',
      'http://localhost:3000',
      'https://nguyenhuuthang.id.vn',
      'https://project-library-q3go.onrender.com',
      '*',
    ],
    credentials: true,
  });

  app.useGlobalInterceptors(new TransformInterceptor())
  console.log(process.env.PORT);

  await app.listen(process.env.PORT);
}
bootstrap();
