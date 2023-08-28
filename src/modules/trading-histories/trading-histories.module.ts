import { Module } from '@nestjs/common';
import { TradingHistoriesService } from './trading-histories.service';
import { TradingHistoriesController } from './trading-histories.controller';

@Module({
  controllers: [TradingHistoriesController],
  providers: [TradingHistoriesService],
})
export class TradingHistoriesModule {}
