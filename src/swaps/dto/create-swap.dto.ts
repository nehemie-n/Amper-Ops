import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNumber } from 'class-validator';

class SwapDto {
  /**
   * References
   */
  @ApiProperty()
  @IsMongoId()
  staff: string;

  @ApiProperty()
  @IsMongoId()
  station: string;

  @ApiProperty()
  @IsMongoId()
  battery: string;

  @ApiProperty()
  @IsMongoId()
  driver: string;

  @ApiProperty()
  @IsNumber()
  batteryPower: number; // Current battery power
}

export class CreateSwapInDto extends SwapDto {}

export class CreateSwapOutDto extends SwapDto {}
