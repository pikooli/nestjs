import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  ParseIntPipe,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CatService } from '@/cat/cat.service';
import { GlobalService } from '@/global/global.service';
import { Cat } from '@/cat/cat.d';
import { RolesGuard } from '@/role.guard';

@Controller('cats')
export class CatController {
  constructor(
    private readonly catService: CatService,
    private readonly globalService: GlobalService,
  ) {}

  @Get()
  getCats(): Cat[] {
    return this.catService.findAll();
  }

  @Get('global')
  getGlobal(): string {
    return this.globalService.get();
  }

  @Get('guarded')
  @UseGuards(RolesGuard)
  getCatsGuarded(): Cat[] {
    return this.catService.findAll();
  }
  @Get(':id')
  getCatById(@Param('id', ParseIntPipe) id: number): Cat | undefined {
    const cat = this.catService.findOne(id);
    if (!cat) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return cat;
  }

  @Post()
  async create(@Body() body: Cat): Promise<string> {
    const cat = await this.catService.create(body);
    return `Cat have been created ${cat.name}`;
  }
}
