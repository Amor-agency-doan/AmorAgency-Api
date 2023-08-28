import { Injectable } from '@nestjs/common';
import { CreateTradingHistoryDto } from './dto/create-trading-history.dto';
import { UpdateTradingHistoryDto } from './dto/update-trading-history.dto';

@Injectable()
export class TradingHistoriesService {
  create(createTradingHistoryDto: CreateTradingHistoryDto) {
    return 'This action adds a new tradingHistory';
  }

  findAll() {
    return `This action returns all tradingHistories`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tradingHistory`;
  }

  update(id: number, updateTradingHistoryDto: UpdateTradingHistoryDto) {
    return `This action updates a #${id} tradingHistory`;
  }

  remove(id: number) {
    return `This action removes a #${id} tradingHistory`;
  }
}
