import { DatabaseModule } from './database/database.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SwapsModule } from './swaps/swaps.module';
import { TrackingsModule } from './trackings/trackings.module';

@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forRoot(process.env.MONGO_URI),

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
