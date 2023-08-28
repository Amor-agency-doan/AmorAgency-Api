import { PartialType } from '@nestjs/swagger';
import { CreateTradingHistoryDto } from './create-trading-history.dto';

export class UpdateTradingHistoryDto extends PartialType(CreateTradingHistoryDto) {}
