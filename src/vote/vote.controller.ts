import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiResponse } from '../response.dto';
import Vote from './vote.entity';
import { VoteService } from './vote.service';

@Controller('vote')
export class VoteController {
  public constructor(private voteService: VoteService) {}

  @Get()
  public async listAll() {
    const data = await this.voteService.findAll();
    return new ApiResponse(`Found [${data.length}] vote(s).`, data);
  }

  @Get('/:id')
  public async getOne(@Param('id', ParseIntPipe) id: number) {
    const data = await this.voteService.find(id);
    return new ApiResponse(`Found vote [${data.id}].`, data);
  }
}
