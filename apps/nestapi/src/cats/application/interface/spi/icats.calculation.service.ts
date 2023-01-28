import { Cat } from '../../../domain/cat.dto';

export abstract class ICatsCalculationService {
  abstract getTopFriendlyCatBreeds(cats: Cat[], total: number): Promise<Cat[]>;
}
