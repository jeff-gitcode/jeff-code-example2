import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetCatsQuery } from './get-cats.query';
import { Cat } from '../../domain/cat.dto';
import { Logger } from '@nestjs/common';
import { ICatsService } from '../interface/spi/icats.service';

@QueryHandler(GetCatsQuery)
export class GetCatsQueryHandler implements IQueryHandler<GetCatsQuery> {
  private readonly logger = new Logger(this.constructor.name);

  constructor(private readonly catService: ICatsService) {
    this.logger.log('GetCatsQueryHandler constructor');
  }

  async execute(query: GetCatsQuery): Promise<Cat[]> {
    this.logger.log('GetCatsQueryHandler execute');

    return await this.catService.getCats();
  }
}
