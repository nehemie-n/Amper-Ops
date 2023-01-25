import { Module } from '@nestjs/common';
import { TrackingsService } from './trackings.service';
import { TrackingsController } from './trackings.controller';

@Module({
  controllers: [TrackingsController],
  providers: [TrackingsService]
})
export class TrackingsModule {}
