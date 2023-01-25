import { Injectable } from '@nestjs/common';
import { CreateTrackingDto } from './dto/create-tracking.dto';
import { InjectModel } from '@nestjs/mongoose';
import {
  Tracking,
  TrackingDocument,
  TrackingModel,
} from 'src/database/entities';

@Injectable()
export class TrackingsService {
  constructor(
    @InjectModel(Tracking.name) private trackingModel: TrackingModel,
  ) {}

  /**
   * Can be improved by putting an SQS before this and then get events from the SQS from this function e.t.c
   * @param createTrackingDto
   * @returns
   */
  async create(
    createTrackingDto: CreateTrackingDto,
  ): Promise<TrackingDocument> {
    const track = await this.trackingModel.create(createTrackingDto);
    return track;
  }
}
