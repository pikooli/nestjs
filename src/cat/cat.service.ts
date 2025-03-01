import { Injectable } from '@nestjs/common';
import type { Cat } from '@/cat/cat';

@Injectable()
export class CatService {
  private readonly cats: Cat[] = [
    {
      id: 1,
      name: 'Cat 1',
      age: 1,
      breed: 'Breed 1',
    },
    {
      id: 2,
      name: 'Cat 2',
      age: 2,
      breed: 'Breed 2',
    },
  ];

  findAll(): Cat[] {
    return this.cats;
  }
  findOne(id: number): Cat | undefined {
    return this.cats.find((cat) => cat.id === id);
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async create(cat: Cat): Promise<Cat> {
    this.cats.push(cat);
    return cat;
  }
}
