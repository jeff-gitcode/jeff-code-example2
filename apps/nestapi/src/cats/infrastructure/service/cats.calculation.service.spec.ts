import { Test, TestingModule } from '@nestjs/testing';

import { Cat } from '../../domain/cat.dto';
import { CatsCalculationService } from './cats.calculation.service';
import { cats, top5Breeds } from '../../domain/cats.mock';

describe('CatsCalculationService', () => {
  let service: CatsCalculationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [],
      providers: [CatsCalculationService],
    }).compile();

    service = module.get<CatsCalculationService>(CatsCalculationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array of top 5 breeds', async () => {
    const expected = top5Breeds;

    const actual = await service.getTopFriendlyCatBreeds(cats, 5);

    expect(actual).toStrictEqual(expected);
  });
});
