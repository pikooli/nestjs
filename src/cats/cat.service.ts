import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';

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

  create(cat: Cat) {
    this.cats.push(cat);
  }

  findAll(): Cat[] {
    return this.cats;
  }

  findOne(id: number): Cat {
    return this.cats.find((cat) => cat.id === id);
  }
}
