import { Type } from 'class-transformer';
import { IsLatitude } from 'class-validator';
import {
  IsLongitude,
  IsMongoId,
  IsObject,
  ValidateNested,
} from 'class-validator';

export class CoordinatesDto {
  @IsLatitude()
  lat: number;

  @IsLongitude()
  lng: number;
}

export class CreateTrackingDto {
  @IsObject()
  @ValidateNested()
  @Type(() => CoordinatesDto)
  coordinates: CoordinatesDto;

  @IsMongoId()
  battery: string;

  @IsMongoId()
  driver: string;
}
