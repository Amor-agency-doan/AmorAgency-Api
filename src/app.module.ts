import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

import { TransformInterceptor } from './interceptors';
import { HttpErrorFilter } from './shared/httpError.filter';

import { DatabaseModule } from './common/database';
import { LoggerModule } from './common/logger';
import { ProductsModule } from './modules/products/products.module';
import { LoggerMiddleware, UserMiddleware } from './middleware';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { SeedsModule } from './common/seeds/seeds.module';
import { AccountModule } from './modules/account/account.module';
import { AuthModule } from './modules/auth/auth.module';
import { MailModule } from './mail/mail.module';
import { ServicesModule } from './modules/services/services.module';
import { FeedbacksModule } from './modules/feedbacks/feedbacks.module';
import { CheckoutModule } from './modules/checkout/checkout.module';
import { TradingHistoriesModule } from './modules/trading-histories/trading-histories.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MailModule,
    DatabaseModule,
    LoggerModule,
    AuthModule,
    AccountModule,
    ProductsModule,
    ServicesModule,
    FeedbacksModule,

    SeedsModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', ''),
    }),
    CheckoutModule,
    TradingHistoriesModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware, UserMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
