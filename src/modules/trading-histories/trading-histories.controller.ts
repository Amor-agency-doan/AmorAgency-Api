import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TradingHistoriesService } from './trading-histories.service';
import { CreateTradingHistoryDto } from './dto/create-trading-history.dto';
import { UpdateTradingHistoryDto } from './dto/update-trading-history.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('[Admin] - Trading histories')
@Controller('trading-histories')
export class TradingHistoriesController {
  constructor(private readonly tradingHistoriesService: TradingHistoriesService) {}

  @Post()
  create(@Body() createTradingHistoryDto: CreateTradingHistoryDto) {
    return this.tradingHistoriesService.create(createTradingHistoryDto);
  }

  @Get()
  findAll() {
    return this.tradingHistoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tradingHistoriesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTradingHistoryDto: UpdateTradingHistoryDto) {
    return this.tradingHistoriesService.update(+id, updateTradingHistoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tradingHistoriesService.remove(+id);
  }
}
