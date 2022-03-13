import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VoterToken } from 'src/security/entities/votertoken.entity';
import { SecurityService } from 'src/security/security.service';
import { Repository } from 'typeorm';
import Voter from './voter.entity';

type VoterCreated = {
  voter: Voter;
  token: VoterToken;
};

@Injectable()
export class VoterService {
  public constructor(
    @InjectRepository(Voter) private repository: Repository<Voter>,
    private securityService: SecurityService,
  ) {}

  public async create(voterId: string): Promise<VoterCreated> {
    let voter = await this.repository.create({ voterId });
    voter = await this.repository.save(voter);

    const token = await this.securityService.createVoterToken(voter);

    return { voter, token };
  }
}
