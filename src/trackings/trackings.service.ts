import { Injectable } from '@nestjs/common';
import { CreateTrackingDto } from './dto/create-tracking.dto';

@Injectable()
export class TrackingsService {
  create(createTrackingDto: CreateTrackingDto) {
    return 'This action adds a new tracking';
  }
}
