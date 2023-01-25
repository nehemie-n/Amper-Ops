import {
  IsMongoId,
  IsNumber,
} from 'class-validator/types/decorator/decorators';

class SwapDto {
  /**
   * References
   */
  @IsMongoId()
  staff: string;

  @IsMongoId()
  Station: string;

  @IsMongoId()
  battery: string;

  @IsMongoId()
  driver: string;

  @IsNumber()
  batteryPower: number; // Current battery power
}

export class CreateSwapInDto extends SwapDto {}

export class CreateSwapOutDto extends SwapDto {}
