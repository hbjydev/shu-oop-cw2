import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import Vote from "./vote.entity";

@Injectable()
export class VoteService {
  private readonly votes: Vote[] = [];

  public constructor(
    @InjectRepository(Vote)
    private voteRepository: Repository<Vote>
  ) {}

  public async findAll(): Promise<Vote[]> {
    return this.voteRepository.find();
  }
}
