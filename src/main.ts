import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /**
   * Set up validation
   */
  app.useGlobalPipes(new ValidationPipe());
  /**
   * Logger
   * Just simple logger
   */
  /**
   * Global prefix
   */
  app.setGlobalPrefix('/v1');

  /**
   * API Start
   */
  await app.listen(process.env.NODE_PORT);
}
bootstrap();
