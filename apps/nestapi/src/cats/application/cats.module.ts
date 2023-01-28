import { HttpModule } from '@nestjs/axios';
import { CacheModule, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TerminusModule } from '@nestjs/terminus';
import { ConfigModule } from '@nestjs/config';

import { CatsController } from '../infrastructure/controllers/cats.controller';
import { CacheService } from '../infrastructure/service/cache.service';
import { CatsCalculationService } from '../infrastructure/service/cats.calculation.service';
import { CatsService } from '../infrastructure/service/cats.service';
import { ConsoleLoggerStrategy } from '../infrastructure/service/logger.service';
import { CatsUseCase } from './cats.usecase';
import { GetCatsQueryHandler } from './cqrs/get-cats.query.handler';
import { ICatsUsecase } from './interface/api/icats.usecase';
import { ICacheService } from './interface/spi/icache.service';
import { ICatsCalculationService } from './interface/spi/icats.calculation.service';
import { ICatsService } from './interface/spi/icats.service';
import { ILogger } from './interface/spi/ilogger.service';

@Module({
  imports: [
    ConfigModule,
    CacheModule.register({
      ttl: 10, // seconds?
    }),
    TerminusModule,
    HttpModule,
    CqrsModule,
  ],
  controllers: [CatsController],
  providers: [
    { provide: ILogger, useClass: ConsoleLoggerStrategy },
    { provide: ICacheService, useClass: CacheService },
    { provide: ICatsCalculationService, useClass: CatsCalculationService },
    { provide: ICatsService, useClass: CatsService },
    { provide: ICatsUsecase, useClass: CatsUseCase },
    GetCatsQueryHandler,
  ],
})
export class CatsModule {}
