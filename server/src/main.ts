import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

const morgan = require('morgan')

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(morgan('dev')) //logs de api calls
  app.setGlobalPrefix('api'); //agregar prefijo a toda la app
  app.useGlobalPipes(new ValidationPipe()); //habilitar class-validator para dtos
  app.enableCors(); //habilitar cors

  await app.listen(process.env.APP_PORT);
}

bootstrap();
