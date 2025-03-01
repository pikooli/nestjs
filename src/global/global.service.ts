import { Injectable } from '@nestjs/common';

@Injectable()
export class GlobalService {
  get() {
    return 'global';
  }
}
