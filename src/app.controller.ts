import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  /**
   * For smoke testing
   * @returns 
   */
  @Get('/status')
  getStatus() {
    return {
      status: 'ok',
      env: process.env.NODE_ENV,
    };
  }
}
