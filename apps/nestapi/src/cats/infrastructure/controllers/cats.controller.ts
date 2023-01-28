import {
  CacheInterceptor,
  CacheKey,
  CacheTTL,
  Controller,
  Get,
  Logger,
  UseInterceptors,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';

import { ICatsUsecase } from '../../application/interface/api/icats.usecase';
import { Cat } from '../../domain/cat.dto';

@Controller('cats')
@ApiTags('cats')
export class CatsController {
  private readonly logger = new Logger(this.constructor.name);

  constructor(private readonly catsUseCase: ICatsUsecase) {
    this.logger.log('CatsController constructor');
  }

  @ApiResponse({ status: 200, description: 'Get all cats.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  // @CacheKey('cats-response')
  // @UseInterceptors(CacheInterceptor)
  // @CacheTTL(1)
  // @Throttle(10, 60)
  @Get('getTopFriendlyCatBreeds')
  async getCats(): Promise<Cat[]> {
    this.logger.log('CatsController getCats');

    return await this.catsUseCase.getCats();
  }
}
