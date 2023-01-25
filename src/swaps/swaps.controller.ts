import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { SwapDocument } from 'src/database/entities';
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
  @Post('in')
  swapIn(@Body() createSwapInDto: CreateSwapInDto) {
    return this.swapsService.swapIn(createSwapInDto);
  }

  /**
   * @todo authenticate users here with an @auth decorator
   *
   * @param CreateSwapOutDto
   */
  @Post('out')
  swapOut(@Body() createSwapOutDto: CreateSwapOutDto): Promise<SwapDocument> {
    return this.swapsService.swapout(createSwapOutDto);
  }
}
