import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { addHours } from 'src/dateutils';
import Voter from 'src/voter/voter.entity';
import { Repository } from 'typeorm';
import { VoterToken } from './entities/votertoken.entity';

@Injectable()
export class SecurityService {
  public constructor(
    @InjectRepository(VoterToken)
    private voterTokenRepo: Repository<VoterToken>,
  ) {}

  public async createVoterToken(voter: Voter): Promise<VoterToken> {
    const date = new Date();
    addHours(date, 1);

    return this.voterTokenRepo.save(
      this.voterTokenRepo.create({
        voter,
        token: randomUUID(),
        eat: date,
      }),
    );
  }

  public async getVoterToken(token: string): Promise<VoterToken | null> {
    return this.voterTokenRepo.findOne({ token });
  }
}
