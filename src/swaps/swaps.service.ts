import { Injectable } from '@nestjs/common';
import { ForbiddenException } from '@nestjs/common/exceptions';
import { InjectModel } from '@nestjs/mongoose';
import {
  Swap,
  SwapDocument,
  SwapModel,
  Tracking,
  TrackingModel,
} from '../database/entities';
import { CalculateService } from './calculate.service';
import { CreateSwapInDto, CreateSwapOutDto } from './dto/create-swap.dto';

/**
 *
 */
const COST_PER_ENERGY = 200; // RWF

@Injectable()
export class SwapsService {
  constructor(
    private calculateService: CalculateService,
    @InjectModel(Swap.name) private swapModel: SwapModel,
    @InjectModel(Tracking.name) private trackingModel: TrackingModel,
  ) {}

  /**
   *
   * @param dto
   */
  async swapIn(dto: CreateSwapInDto): Promise<SwapDocument> {
    const lastSwap = await this.getLastSwapOut(dto.battery);
    if (!lastSwap) {
      throw new ForbiddenException('Could not find the last record of Swap');
    }
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
  async swapout(dto: CreateSwapOutDto) {
    const swap = await this.swapModel.create({
      ...dto,
      in: false, // getting the battery
    });
  }
}
