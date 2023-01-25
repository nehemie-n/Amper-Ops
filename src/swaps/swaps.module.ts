import { Module } from '@nestjs/common';
import { SwapsService } from './swaps.service';
import { SwapsController } from './swaps.controller';
import { CalculateService } from './calculate.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [SwapsController],
  providers: [SwapsService, CalculateService],
})
export class SwapsModule {}
