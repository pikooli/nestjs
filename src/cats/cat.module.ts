import { Module, Global } from '@nestjs/common';
import { CatsController } from './cat.controller';
import { CatService } from './cat.service';

@Global()
@Module({
  imports: [],
  controllers: [CatsController],
  providers: [CatService],
})
export class CatModule {}
