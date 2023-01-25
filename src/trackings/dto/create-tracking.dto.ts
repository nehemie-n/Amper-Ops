import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsLatitude } from 'class-validator';
import {
  IsLongitude,
  IsMongoId,
  IsObject,
  ValidateNested,
} from 'class-validator';

export class CoordinatesDto {
  @ApiProperty()
  @IsLatitude()
  lat: number;

  @ApiProperty()
  @IsLongitude()
  lng: number;
}

export class CreateTrackingDto {
  @ApiProperty()
  @IsObject()
  @ValidateNested()
  @Type(() => CoordinatesDto)
  coordinates: CoordinatesDto;

  @ApiProperty()
  @IsMongoId()
  battery: string;

  @ApiProperty()
  @IsMongoId()
  driver: string;
}
