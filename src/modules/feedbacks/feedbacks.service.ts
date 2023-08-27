import { Injectable } from '@nestjs/common';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Feedbacks } from './feedbacks.schema';
import { Model } from 'mongoose';
import { MailService } from '../../mail/mail.service';

@Injectable()
export class FeedbacksService {
  constructor(
    @InjectModel(Feedbacks.name) private feedbacksModel: Model<Feedbacks>,
    private mailService: MailService,
  ) {}

  findAll() {
    return `This action returns all feedbacks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} feedback`;
  }

  update(id: number, updateFeedbackDto: UpdateFeedbackDto) {
    return `This action updates a #${id} feedback`;
  }

  sendFeedBack() {
    console.log('12312');
    
    this.mailService.sendFeedBack();

    return 123;
  }
}
