import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { Voter as VoterD } from 'src/security/voter.decorator';
import Voter from 'src/voter/voter.entity';
import { ApiResponse } from '../response.dto';
import { VoteService } from './vote.service';

@Controller('vote')
export class VoteController {
  public constructor(private voteService: VoteService) {}

  /**
   * Lists all votes in the system
   * @returns An API response
   */
  @Get()
  public async listAll() {
    const data = await this.voteService.findAll();
    return new ApiResponse(`Found [${data.length}] vote(s).`, data);
  }

  /**
   * Retrieves one vote from the database.
   * @param voter The current voter
   * @param id The ID of the vote to retrieve
   * @returns The information about the vote requested
   */
  @Get('/:id')
  public async getOne(
    @VoterD() voter: Voter,
    @Param('id', ParseIntPipe) id: number,
  ) {
    console.log(voter);
    const data = await this.voteService.find(id);
    return new ApiResponse(`Found vote [${data.id}].`, data);
  }
}
