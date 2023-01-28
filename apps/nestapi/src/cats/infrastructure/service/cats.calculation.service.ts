import { Injectable } from '@nestjs/common';
import { ICatsCalculationService } from '../../application/interface/spi/icats.calculation.service';
import { Cat } from '../../domain/cat.dto';

@Injectable()
export class CatsCalculationService implements ICatsCalculationService {
  async getTopFriendlyCatBreeds(cats: Cat[], total: number): Promise<Cat[]> {
    cats.sort(
      (a, b) =>
        (a.child_friendly + a.dog_friendly + a.stranger_friendly) / total -
        (b.child_friendly + b.dog_friendly + b.stranger_friendly) / total
    );

    // return the top 5 cat breeds
    return Promise.resolve(cats.slice(0, total));
  }
}
