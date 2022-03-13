import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiResponse } from './response.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return new ApiResponse('Welcome to VoteBox', {
      voteUri: '/vote',
      voterUri: '/voter',
      authUri: '/auth',
      adminUri: '/admin',
    });
  }
}
