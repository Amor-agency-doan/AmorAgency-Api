import { BadRequestException, Injectable } from '@nestjs/common';
import { Account } from './account.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ACCOUNT_MESSAGES, EAccountRole } from '~/constants';
import { Observable, throwError } from 'rxjs';
import { RegisterAdminDto, registerUserdto } from './dto';
import { AppResponse } from '~/common/interfaces';

@Injectable()
export class AccountService {
  constructor(@InjectModel(Account.name) private accountModel: Model<Account>) {}

  async register(
    registerDto: registerUserdto | RegisterAdminDto,
    role: EAccountRole,
  ): Promise<Account | Observable<never>> {
    const { email, fullname } = registerDto;
    let password = 'password' in registerDto ? registerDto.password : '';

    const checkExist = await this.accountModel.findOne({ email: email.trim().toLowerCase() });
    if (checkExist) {
      return throwError(new BadRequestException(ACCOUNT_MESSAGES.EMAIL_EXISTED));
    }
    const user = new this.accountModel({
      email: email.toLowerCase(),
      fullname: fullname.trim(),
      role: role,
      password: password,
    });

    await user.save();

    return user;
  }

  async registerAdmin(registerDto: RegisterAdminDto): Promise<AppResponse<Account> | Observable<never>> {
    const admin = await this.register(registerDto, EAccountRole.ADMIN);

    if (admin instanceof Observable) {
      return admin;
    }

    return { content: admin };
  }

  async registerStudent(registerDto: registerUserdto): Promise<AppResponse<Account> | Observable<never>> {
    const student = await this.register(registerDto, EAccountRole.USER);
    if (student instanceof Observable) {
      return student;
    }
    return { content: student };
  }
}
