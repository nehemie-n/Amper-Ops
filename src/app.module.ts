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
    SwapsModule,
    TrackingsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
