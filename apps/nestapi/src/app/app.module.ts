import {
  CacheInterceptor,
  CacheModule,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule } from '@nestjs/config';

import { CatsModule } from '../cats/application/cats.module';
import { HealthModule } from '../health/health.module';
import { LoggerMiddleware } from '../middleware/logger.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from '../config/configuration';

export const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,
      load: [configuration],
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 20, // times
    }),
    CacheModule.register({
      ttl: 5, // seconds
    }),
    CatsModule,
    HealthModule,
  ],
  controllers: [AppController],
  providers: [
    // bind CacheInterceptor to all endpoints globally
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
    // bind ThrottlerGuard to all endpoints globally
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    AppService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('users');
  }
}
