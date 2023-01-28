import { Cat } from '../../../domain/cat.dto';

export abstract class ICatsService {
  abstract getCats(): Promise<Cat[]>;
}
