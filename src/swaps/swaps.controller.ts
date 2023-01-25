import { Body, Controller, Post } from '@nestjs/common';
import { CreateSwapInDto } from './dto/create-swap.dto';
import { SwapsService } from './swaps.service';

@Controller('swaps')
export class SwapsController {
  constructor(private readonly swapsService: SwapsService) {}

  @Post()
  create(@Body() createSwapInDto: CreateSwapInDto) {}
}
