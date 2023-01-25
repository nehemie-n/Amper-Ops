import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from '@nestjs/common/services';
import { Application } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /**
   * Set up validation
   */
  app.useGlobalPipes(
    new ValidationPipe({
      stopAtFirstError: true,
      forbidNonWhitelisted: true,
      // forbidUnknownValues: true,
      transform: true,
      // whitelist: false,
    }),
  );
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
  await app.listen(process.env.NODE_PORT, () => {
    const logger = new Logger('App');
    logger.verbose(
      'API Server Started at Port: http://localhost:' + process.env.NODE_PORT,
    );
  });
}
bootstrap();
