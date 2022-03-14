import { Body, Controller, Get, HttpException, NotFoundException, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { IsUserGuard } from 'src/auth/is-user.guard';
import { IsVoterGuard } from 'src/auth/is-voter.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/role.decorator';
import { RoleGuard } from 'src/auth/role.guard';
import { ApiResponse } from 'src/response.dto';
import { Role } from 'src/user/role.enum';
import { VoteService } from 'src/vote/vote.service';
import { BallotService } from './ballot.service';

@Controller('ballot')
export class BallotController {
  public constructor(
    private ballotService: BallotService,
    private voteService: VoteService,
  ) {}

  @UseGuards(JwtAuthGuard, IsVoterGuard)
  @Post()
  public async submit(@Body() body) {
    const { voteId, option } = body;
    const vote = await this.voteService.find(voteId);
    if (!vote) throw new NotFoundException(`No such vote [${voteId}].`);

    const now = new Date();
    if (vote.endDate < now || vote.startDate > now)
      throw new NotFoundException(
        `Vote [${vote.title}] has either not started or ended.`,
      );

    const ballot = await this.ballotService.submit(vote, option);

    return new ApiResponse('Successfully submitted ballot.', ballot);
  }

  @UseGuards(JwtAuthGuard, IsUserGuard, RoleGuard)
  @Roles(Role.auditor, Role.admin)
  @Get('count/:voteId')
  public async count(@Param('voteId', ParseIntPipe) id: number) {
    const vote = await this.voteService.find(id);
    if (!vote) throw new NotFoundException(`No such vote [${id}].`);

    const ballots = await this.ballotService.count(vote);

    return new ApiResponse('Successfully counted ballots.', ballots);
  }
}
