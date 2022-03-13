import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { Repository } from 'typeorm';
import Voter from './voter.entity';

type VoterCreated = {
  voter: Voter;
  token: string;
};

@Injectable()
export class VoterService {
  public constructor(
    @InjectRepository(Voter) private repository: Repository<Voter>,
    private authService: AuthService,
  ) {}

  public async create(voterId: string): Promise<VoterCreated> {
    let voter = await this.repository.create({ voterId });
    voter = await this.repository.save(voter);

    const token = await this.authService.voterLogin(voter);

    return { voter, token };
  }

  public async find(id: number): Promise<Voter> {
    return this.repository.findOne(id);
  }
}
