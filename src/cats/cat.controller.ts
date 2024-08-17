import {
  Controller,
  Get,
  HttpCode,
  Res,
  Param,
  Post,
  Body,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { CatService } from './cat.service';
import { Cat } from './interfaces/cat.interface';
import { RolesGuard } from '../role.guard';

@Controller('cats')
@UseGuards(RolesGuard)
export class CatsController {
  constructor(private readonly catService: CatService) {}

  @HttpCode(203)
  @Get()
  getCats(): Cat[] {
    return this.catService.findAll();
  }

  // curl "localhost:3000/cats" --header "Content-Type: application/json" --request POST --data '{"id": 1, "name": "cat-1", "age": 3, "breed": "bread-1"}'
  @Post()
  create(@Body() body: Cat): string {
    console.log(body);
    this.catService.create(body);
    return `This action adds a new cat and you send ${JSON.stringify(body)}`;
  }

  @Get(':id')
  getCat(
    @Param('id', ParseIntPipe) id,
    @Res({ passthrough: true }) response,
  ): Cat {
    response.status(200);
    return this.catService.findOne(id);
  }
}
