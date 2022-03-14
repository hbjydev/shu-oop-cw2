import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Vote from 'src/vote/vote.entity';
import { Repository } from 'typeorm';
import { Ballot } from './ballot.entity';

@Injectable()
export class BallotService {
  public constructor(
    @InjectRepository(Ballot)
    private repository: Repository<Ballot>,
  ) {}

  public async submit(vote: Vote, option: string) {
    if (!vote.options.find((v) => v.name == option))
      throw new Error(
        `No such option [${option}] present on vote [${vote.title}]`,
      );
    const ballot = new Ballot();
    ballot.vote = vote;
    ballot.option = option;
    return this.repository.save(ballot);
  }

  public async count(vote: Vote) {
    const response = {};

    for (const val of vote.options) {
      const ballots = await this.repository
        .createQueryBuilder()
        .select('count(id)')
        .where('"voteId" = :voteId', { voteId: vote.id })
        .andWhere('option = :option', { option: val.name })
        .groupBy('option')
        .getRawOne();

      response[val.name] = ballots ? ballots.count : 0;
    }

    return response;
  }
}
