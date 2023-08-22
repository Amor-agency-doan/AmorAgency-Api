import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Account } from '../account/account.schema';
import { ConfigService } from '@nestjs/config';

interface JwtPayload {
  accountId?: string;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Account.name) private accountModel: Model<Account>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
}
