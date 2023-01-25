import { Type } from 'class-transformer';
import { IsLatitude } from 'class-validator';
import {
    IsLongitude,
    IsMongoId,
    IsObject,
    ValidateNested
} from 'class-validator/types/decorator/decorators';

export class CreateTrackingDto {
  @IsObject()
  @ValidateNested()
  @Type(() => Coordinates)
  coordinates: Coordinates;

  @IsMongoId()
  battery: string;

  @IsMongoId()
  driver: string;
}

export class Coordinates {
  @IsLatitude()
  lat: number;

  @IsLongitude()
  lng: number;
}
