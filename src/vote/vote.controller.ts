import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { IsUserGuard } from 'src/auth/is-user.guard';
import { IsVoterGuard } from 'src/auth/is-voter.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/role.decorator';
import { RoleGuard } from 'src/auth/role.guard';
import { Role } from 'src/user/role.enum';
import { FindManyOptions } from 'typeorm';
import { ApiResponse } from '../response.dto';
import { CreateVoteDto } from './dtos/create-vote.dto';
import { UpdateVoteDto } from './dtos/update-vote.dto';
import Vote from './vote.entity';
import { VoteService } from './vote.service';

@Controller('vote')
export class VoteController {
  public constructor(private voteService: VoteService) {}

  /**
   * Lists all votes in the system
   * @returns An API response
   */
  @Get()
  public async listAll(@Query('sort') sort?: string) {
    const findManyOpts: FindManyOptions<Vote> = {
      select: ['id', 'title', 'description', 'startDate'],
    };
    if (sort) {
      findManyOpts.order = {
        [sort.split(',')[0]]: sort.split(',')[1].toUpperCase(),
      };
    }
    const data = await this.voteService.findAll(findManyOpts);
    return new ApiResponse(`Found [${data.length}] vote(s).`, data);
  }

  /**
   * Retrieves one vote from the database.
   * @param voter The current voter
   * @param id The ID of the vote to retrieve
   * @returns The information about the vote requested
   */
  @Get('/:id')
  public async getOne(@Param('id', ParseIntPipe) id: number) {
    const data = await this.voteService.find(id);
    return new ApiResponse(`Found vote [${data.id}].`, data);
  }

  @UseGuards(JwtAuthGuard, IsUserGuard, RoleGuard)
  @Roles(Role.admin)
  @Patch('/:id')
  public async updateOne(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) body: UpdateVoteDto,
  ) {
    const vote = await this.voteService.find(id);
    if (!vote) throw new NotFoundException();

    if (body.title) vote.title = body.title;
    if (body.description) vote.description = body.description;
    if (body.options) vote.options = body.options;
    if (body.startDate) vote.startDate = body.startDate;
    if (body.endDate) vote.endDate = body.endDate;

    const updatedVote = await this.voteService.save(vote);

    return new ApiResponse('Successfully updated vote', updatedVote);
  }

  @UseGuards(JwtAuthGuard, IsUserGuard, RoleGuard)
  @Roles(Role.admin)
  @Post('/')
  public async create(@Body(ValidationPipe) body: CreateVoteDto) {
    const vote = await this.voteService.create(body);
    return new ApiResponse('Successfully created vote', vote);
  }

  @UseGuards(JwtAuthGuard, IsUserGuard, RoleGuard)
  @Roles(Role.admin)
  @Delete('/:id')
  public async delete(@Param('id', ParseIntPipe) id: number) {
    await this.voteService.deleteById(id);
    return new ApiResponse('Successfully deleted vote.', null);
  }

  @UseGuards(JwtAuthGuard, IsVoterGuard)
  @Post('/cast')
  public async vote(@Param('id', ParseIntPipe) id: number, @Body() body) {
    const vote = await this.voteService.find(id);
    const { options } = vote;
    const option = options.find((v) => v.name == body.option);
    console.log(option);
  }
}
