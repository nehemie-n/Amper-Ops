import { Injectable } from '@nestjs/common';
import { Swap, SwapDocument, SwapModel } from 'src/database/entities';
import { CreateSwapInDto, CreateSwapOutDto } from './dto/create-swap.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { CalculateService } from './calculate.service';

/**
 *
 */
const COST_PER_ENERGY = 200; // RWF

@Injectable()
export class SwapsService {
  constructor(
    private calculateService: CalculateService,
    @InjectModel(Swap.name) private swapModel: SwapModel,
  ) {}

  /**
   *
   * @param dto
   */
  async swapIn(dto: CreateSwapInDto): Promise<SwapDocument> {
    const lastSwap = await this.getLastSwapOut(dto.battery);
    const distance: number = await this.calculateService.calculate(
      dto.battery,
      dto.driver,
      true,
    );
    const powerUsed: number = dto.batteryPower - lastSwap.batteryPower;
    const charge: number = powerUsed * COST_PER_ENERGY; // in RWF
    return this.swapModel.create({
      ...dto,
      in: true, // return the the battery
      distance,
      powerUsed,
      charge,
    });
  }
  /**
   *
   * @param battery
   * @returns
   */
  private getLastSwapOut(battery: string) {
    return this.swapModel.findOne({
      in: false, // was out
      battery: battery,
    });
  }

  /**
   *
   * @param dto
   */
  swapout(dto: CreateSwapOutDto) {
    return this.swapModel.create({
      ...dto,
      in: false, // getting the battery
    });
  }
}
