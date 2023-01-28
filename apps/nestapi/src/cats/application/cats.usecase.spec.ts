import { Test, TestingModule } from '@nestjs/testing';
import { mock } from 'jest-mock-extended';
import { QueryBus } from '@nestjs/cqrs';
import { Cat } from '../domain/cat.dto';
import { CatsUseCase } from './cats.usecase';
import { cats } from '../domain/cats.mock';

describe('CatsUseCase', () => {
  let usecase: CatsUseCase;
  let queryBus: QueryBus;
  const mockQueryBus = mock<QueryBus>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [],
      providers: [CatsUseCase, { provide: QueryBus, useValue: mockQueryBus }],
    }).compile();

    usecase = module.get<CatsUseCase>(CatsUseCase);
    queryBus = module.get<QueryBus>(QueryBus);
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  it('should return an array of cats', async () => {
    const expected = cats;

    mockQueryBus.execute.mockResolvedValue(expected);

    expect(await usecase.getCats()).toBe(expected);
  });
});
