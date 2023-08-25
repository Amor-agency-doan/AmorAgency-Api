import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController, UserServicesController } from './services.controller';

@Module({
  controllers: [ServicesController, UserServicesController],
  providers: [ServicesService],
})
export class ServicesModule {}
