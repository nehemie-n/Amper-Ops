import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/status')
  getStatus() {
    return {
      status: 'ok',
      env: process.env.NODE_ENV,
    };
  }
}
