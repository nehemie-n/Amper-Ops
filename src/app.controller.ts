import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  @Get('/status')
  status() {
    return {
      status: 'ok',
      env: process.env.NODE_ENV
    };
  }
}
