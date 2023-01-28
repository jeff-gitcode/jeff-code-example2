import { Test, TestingModule } from '@nestjs/testing';
import { mock } from 'jest-mock-extended';
import { ICatsUsecase } from '../../application/interface/api/icats.usecase';
import { Cat } from '../../domain/cat.dto';
import { CatsController } from './cats.controller';
import { cats } from '../../domain/cats.mock';

describe('CatsController', () => {
  let controller: CatsController;
  let catsUseCase: ICatsUsecase;
  const mockCatsUseCase = mock<ICatsUsecase>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [CatsController],
      providers: [{ provide: ICatsUsecase, useValue: mockCatsUseCase }],
    }).compile();

    controller = module.get<CatsController>(CatsController);
    catsUseCase = module.get<ICatsUsecase>(ICatsUsecase);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an array of cats', async () => {
    const expected = cats;

    mockCatsUseCase.getCats.mockResolvedValue(expected);

    expect(await controller.getCats()).toBe(expected);
  });
});
