import { Test, TestingModule } from '@nestjs/testing';
import { Cat } from '../../domain/cat.dto';
import { CatsService } from './cats.service';
import { ICatsCalculationService } from '../../application/interface/spi/icats.calculation.service';
import { mock } from 'jest-mock-extended';
import { HttpService, HttpModule } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

import { ICacheService } from '../../application/interface/spi/icache.service';
import { cats } from '../../domain/cats.mock';

describe('CatsService', () => {
  let service: CatsService;
  let httpService: HttpService;

  let catsCalculationService: ICatsCalculationService;
  const mockCatsCaluationService = mock<ICatsCalculationService>();
  let cacheService: ICacheService;
  const mockCacheService = mock<ICacheService>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [],
      providers: [
        CatsService,
        ConfigService,
        {
          provide: ICatsCalculationService,
          useValue: mockCatsCaluationService,
        },
        {
          provide: ICacheService,
          useValue: mockCacheService,
        },
      ],
    }).compile();

    service = module.get<CatsService>(CatsService);
    catsCalculationService = module.get<ICatsCalculationService>(
      ICatsCalculationService
    );
    cacheService = module.get<ICacheService>(ICacheService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array of cats', async () => {
    const expected = cats;

    mockCatsCaluationService.getTopFriendlyCatBreeds.mockResolvedValue(
      expected
    );
    mockCacheService.get.mockResolvedValue(expected);

    expect(await service.getCats()).toBe(expected);
  });
});
