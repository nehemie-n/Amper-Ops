import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Tracking, TrackingModel } from 'src/database/entities';
import { Coordinates } from 'src/database/entities/location';

const EARTH_RADIOS = 6371; // Earth's radius in kilometers

@Injectable()
export class CalculateService {
  constructor(
    @InjectModel(Tracking.name) private trackingModel: TrackingModel,
  ) {}

  /**
   * Returns distance in KM
   * @param battery
   * @param driver
   * @param modify
   */
  async calculate(
    battery: string,
    driver: string,
    modify = true,
  ): Promise<number> {
    const tracks = await this.fetchCoordinates(battery, driver, modify);
    let distance = 0;
    for (let i = 0; i < tracks.length - 1; i++) {
      distance += this.haversineDistance(
        tracks[i].coordinates,
        tracks[i + 1].coordinates,
      );
    }
    return distance;
  }

  private haversineDistance(coord1: Coordinates, coord2: Coordinates) {
    const lat1 = coord1.lat;
    const lon1 = coord1.lng;
    const lat2 = coord2.lat;
    const lon2 = coord2.lng;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = EARTH_RADIOS * c;
    return distance;
  }

  /**
   * @todo can be improved to track if bike is in self motion or being carried by something like a truck
   * Fetch all battery & driver trackings that were not calculated
   * @param battery
   * @param driver
   * @param modify
   */
  private async fetchCoordinates(
    battery: string,
    driver: string,
    modify = true,
  ) {
    const filters = {
      driver,
      battery,
      isCalculated: false,
    };
    const tracks = await this.trackingModel.find(filters);
    /**
     * Don't wait for modification
     */
    if (modify) {
      this.trackingModel
        .updateMany(filters, {
          $set: {
            isCalculated: true,
          },
        })
        .exec();
    }

    return tracks;
  }
}
