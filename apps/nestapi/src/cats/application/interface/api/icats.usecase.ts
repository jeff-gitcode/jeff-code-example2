import { Cat } from '../../../domain/cat.dto';

export abstract class ICatsUsecase {
  // abstract getCat(id: string): Promise<Cat>;
  abstract getCats(): Promise<Cat[]>;
}
