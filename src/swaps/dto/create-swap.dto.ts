import { IsMongoId, IsNumber } from 'class-validator';

class SwapDto {
  /**
   * References
   */
  @IsMongoId()
  staff: string;

  @IsMongoId()
  station: string;

  @IsMongoId()
  battery: string;

  @IsMongoId()
  driver: string;

  @IsNumber()
  batteryPower: number; // Current battery power
}

export class CreateSwapInDto extends SwapDto {}

export class CreateSwapOutDto extends SwapDto {}
