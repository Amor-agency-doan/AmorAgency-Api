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

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    LoggerModule,
    ProductsModule,
    AccountModule,
    SeedsModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', ''),
    }),
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
