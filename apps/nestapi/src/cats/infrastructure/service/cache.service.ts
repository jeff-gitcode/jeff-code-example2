import { CACHE_MANAGER, Inject, Injectable, Logger } from '@nestjs/common';
import { Cache } from 'cache-manager';

import { ICacheService } from '../../application/interface/spi/icache.service';

@Injectable()
export class CacheService implements ICacheService {
  private readonly logger = new Logger(this.constructor.name);

  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {
    this.logger.log('CacheService constructor');
  }

  async get<T>(key: string): Promise<T | undefined> {
    this.logger.log('CacheService get');

    return this.cacheManager.get<T>(key);
  }

  async set<T>(key: string, value: T, ttl?: number): Promise<void> {
    this.logger.log('CacheService set');

    this.cacheManager.set(key, value, ttl);
  }
}
