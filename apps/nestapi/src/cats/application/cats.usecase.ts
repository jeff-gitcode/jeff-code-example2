import { Injectable, Logger } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { Cat } from '../domain/cat.dto';
import { GetCatsQuery } from './cqrs/get-cats.query';
import { ICatsUsecase } from './interface/api/icats.usecase';

@Injectable()
export class CatsUseCase implements ICatsUsecase {
  private readonly logger = new Logger(this.constructor.name);

  constructor(private readonly queryBus: QueryBus) {}

  async getCats(): Promise<Cat[]> {
    this.logger.log('CatsUseCase getCats');

    return await this.queryBus.execute(new GetCatsQuery());
  }
}
