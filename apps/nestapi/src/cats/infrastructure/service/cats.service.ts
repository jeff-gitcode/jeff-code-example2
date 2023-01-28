import { HttpService } from '@nestjs/axios';
import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  Logger,
  Scope,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { ConfigService } from '@nestjs/config';

import { ICacheService } from '../../application/interface/spi/icache.service';

import { ICatsCalculationService } from '../../application/interface/spi/icats.calculation.service';
import { ICatsService } from '../../application/interface/spi/icats.service';
import { Cat } from '../../domain/cat.dto';

@Injectable()
export class CatsService implements ICatsService {
  private readonly logger = new Logger(this.constructor.name);

  private url: string;

  private readonly cacheKey = 'cats';
  private cacheTtl: number;

  private readonly headersRequest = {
    'Content-Type': 'application/json',
  };

  constructor(
    private readonly http: HttpService,
    private readonly catsCalculationService: ICatsCalculationService,
    private readonly cacheService: ICacheService,
    private readonly configService: ConfigService
  ) {
    this.logger.log('CatsService constructor');

    this.url = this.configService.get<string>('catsApi');
    this.cacheTtl = this.configService.get<number>('cacheTtl');
  }

  async getCats(): Promise<Cat[]> {
    this.logger.log('CatsService getCats');

    // return the cached result if it exists
    const cachedCats = await this.cacheService.get<Cat[]>(this.cacheKey);

    if (cachedCats) {
      this.logger.log('CatsService getCats from cache');
      return cachedCats as Cat[];
    }

    // if not exists in cache, get the cats from the api
    this.logger.log('CatsService getCats from api ' + this.url);

    // get the cats from the api
    const response = await this.http
      .get(this.url, { headers: this.headersRequest })
      .toPromise();

    const casts = response.data;

    // calculate the top 5 cat breeds
    const result = await this.catsCalculationService.getTopFriendlyCatBreeds(
      casts,
      5
    );

    // cache the result
    this.logger.log('CatsService cachettl: ' + this.cacheTtl);
    await this.cacheService.set(this.cacheKey, result, this.cacheTtl);

    return result;
  }
}
