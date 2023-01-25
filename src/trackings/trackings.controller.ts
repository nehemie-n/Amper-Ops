import {
  Body, Controller, Post
} from '@nestjs/common';
import { CreateTrackingDto } from './dto/create-tracking.dto';
import { TrackingsService } from './trackings.service';

@Controller('trackings')
export class TrackingsController {
  constructor(private readonly trackingsService: TrackingsService) {}

  @Post()
  create(@Body() createTrackingDto: CreateTrackingDto) {
    return this.trackingsService.create(createTrackingDto);
  }
}
