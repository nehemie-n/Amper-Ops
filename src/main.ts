import { ValidationPipe } from '@nestjs/common';
import { Logger } from '@nestjs/common/services';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

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
   * Global prefix
   */
  app.setGlobalPrefix('/v1');

  /**
   * Swagger setup
   */
  const config = new DocumentBuilder()
    .setTitle('Amper-Ops')
    .setDescription('Amper-Ops API')
    .setVersion('1.0')
    .addTag('Amper-Ops')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

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
