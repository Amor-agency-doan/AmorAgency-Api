import { Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { AppResponse } from '~/common/interfaces';
import { Observable } from 'rxjs';
import { Services, ServicesDocument } from './services.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// {
//   "type": "FACEBOOK_RENTAL_SERVICE",
//   "category": "PERSONAL_ACCOUNT",
//   "status": "NEW",
//   "title": "1",
//   "content": "content"
// }
@Injectable()
export class ServicesService {
  constructor(@InjectModel(Services.name) readonly servicesModel: Model<ServicesDocument>) {}

  async create(createServiceDto: CreateServiceDto): Promise<AppResponse<Services> | Observable<never>> {

    return {
      content: await this.servicesModel.create({
        ...createServiceDto,
      }),
    };
  }
  findAll() {
    return `This action returns all services`;
  }

  findOne(id: number) {
    return `This action returns a #${id} service`;
  }

  update(id: number, updateServiceDto: UpdateServiceDto) {
    return `This action updates a #${id} service`;
  }

  remove(id: number) {
    return `This action removes a #${id} service`;
  }
}
