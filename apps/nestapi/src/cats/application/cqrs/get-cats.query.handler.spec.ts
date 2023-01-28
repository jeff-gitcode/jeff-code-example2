import { Test, TestingModule } from '@nestjs/testing';
import { mock } from 'jest-mock-extended';
import { ICatsService } from '../interface/spi/icats.service';
import { Cat } from '../../domain/cat.dto';
import { GetCatsQueryHandler } from './get-cats.query.handler';
import { GetCatsQuery } from './get-cats.query';
import { cats } from '../../domain/cats.mock';

describe('GetCatsQueryHandler', () => {
  let handler: GetCatsQueryHandler;
  let catsService: ICatsService;
  const mockCatsService = mock<ICatsService>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [],
      providers: [
        GetCatsQueryHandler,
        { provide: ICatsService, useValue: mockCatsService },
      ],
    }).compile();

    handler = module.get<GetCatsQueryHandler>(GetCatsQueryHandler);
    catsService = module.get<ICatsService>(ICatsService);
  });

  it('should be defined', () => {
    expect(handler).toBeDefined();
  });

  it('should return an array of cats', async () => {
    const expected = cats;

    mockCatsService.getCats.mockResolvedValue(expected);

    expect(await handler.execute(new GetCatsQuery())).toBe(expected);
  });
});
