import { Body, Controller, Post } from '@nestjs/common';
import { CreateSwapInDto, CreateSwapOutDto } from './dto/create-swap.dto';
import { SwapsService } from './swaps.service';

@Controller('swaps')
export class SwapsController {
  constructor(private readonly swapsService: SwapsService) {}

  /**
   * @todo authenticate users here
   *
   *
   * @param createSwapInDto
   */
  @Post()
  swapIn(@Body() createSwapInDto: CreateSwapInDto) {
    return this.swapsService.swapIn(createSwapInDto);
  }

  /**
   * @todo authenticate users here with an @auth decorator
   *
   * @param CreateSwapOutDto
   */
  @Post()
  swapOut(@Body() createSwapOutDto: CreateSwapOutDto) {
    return this.swapsService.swapout(createSwapOutDto);
  }
}
