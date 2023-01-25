import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Station,
  StationSchema,
  Swap,
  SwapSchema,
  Tracking,
  TrackingSchema,
} from './entities';
import { Battery, BatterySchema } from './entities/battery.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Battery.name,
        schema: BatterySchema,
      },
      {
        name: Station.name,
        schema: StationSchema,
      },
      {
        name: Swap.name,
        schema: SwapSchema,
      },
      {
        name: Tracking.name,
        schema: TrackingSchema,
      },
    ]),
  ],
  controllers: [],
  providers: [],
  exports: [MongooseModule],
})
export class DatabaseModule {}
