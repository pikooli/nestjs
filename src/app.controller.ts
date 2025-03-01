import {
  Controller,
  Get,
  HostParam,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AppService } from './app.service';

export class ForbiddenException extends HttpException {
  constructor() {
    super('Forbidden', HttpStatus.FORBIDDEN);
  }
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  // abcd, abxcd, abRANDOMcd, ab123cd, and so on
  @Get('ab*cd')
  findAll(@HostParam() host) {
    console.log('host', host);
    return 'This route uses a wildcard';
  }
  @Get('/foo')
  get() {
    throw new HttpException(
      {
        status: HttpStatus.FORBIDDEN,
        error: 'This is a custom message',
      },
      HttpStatus.FORBIDDEN,
      {
        cause: 'error',
      },
    );
  }

  @Get('/fuu')
  get2() {
    throw new ForbiddenException();
  }
}
