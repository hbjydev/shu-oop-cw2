import { Controller, Get } from "@nestjs/common";
import { ApiResponse } from "../response.dto";
import { VoteService } from "./vote.service";

@Controller('vote')
export class VoteController {
  public constructor(private voteService: VoteService) {}

  @Get()
  public async listAll() {
    const data = await this.voteService.findAll();
    return new ApiResponse(`Found ${data.length} votes.`, data);
  }
}
