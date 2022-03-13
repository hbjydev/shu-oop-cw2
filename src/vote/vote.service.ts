import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import Vote from './vote.entity';

@Injectable()
export class VoteService {
  private readonly votes: Vote[] = [];

  public constructor(
    @InjectRepository(Vote)
    private voteRepository: Repository<Vote>,
  ) {}

  public async findAll(opts: FindManyOptions<Vote> = null): Promise<Vote[]> {
    return this.voteRepository.find(opts);
  }

  public async find(id: number): Promise<Vote | undefined> {
    return this.voteRepository.findOne(id);
  }

  public async create(data): Promise<Vote> {
    const vote = this.voteRepository.create({
      title: data.title,
      description: data.description,
      startDate: data.startDate,
      endDate: data.endDate,
    });
    return this.voteRepository.save(vote);
  }

  public async save(vote: Vote): Promise<Vote> {
    return this.voteRepository.save(vote);
  }

  public async deleteById(id: number) {
    return this.voteRepository.delete(id);
  }
}
