import { Controller, Get } from "@nestjs/common";
import { VoteService } from "./vote.service";

@Controller('vote')
export class VoteController {
  public constructor(private voteService: VoteService) {}

  @Get()
  public listAll() {
    return this.voteService.findAll();
  }
}
