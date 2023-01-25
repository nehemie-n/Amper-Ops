import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { DatabaseModule } from './database/database.module';
import { SwapsModule } from './swaps/swaps.module';
import { TrackingsModule } from './trackings/trackings.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI),
    DatabaseModule,
    /**
     * Module in charge of
     * 1. SwapIn battery
     * 2. SwapOut battery
     */
    SwapsModule,
    /**
     * Module for storing battery tracking
     * 1. Can be a microservice and be moved to a function (AWS Lambda or similar)
     * 2. Can be integrated with an SQS
     */
    TrackingsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
