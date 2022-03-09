import { Repository } from "typeorm";
import { VoteController } from "./vote.controller";
import Vote from "./vote.entity";
import { VoteService } from "./vote.service";

describe('VoteController', () => {
  let voteRepository: Repository<Vote>;
  let voteController: VoteController;
  let voteService: VoteService;

  beforeEach(() => {
    voteRepository = new Repository<Vote>();
    voteService = new VoteService(voteRepository);
    voteController = new VoteController(voteService);
  });

  describe('listAll', () => {
    it('should return an array of data', async () => {
      const vote = new Vote();
      vote.id = 1;
      vote.title = 'Test';
      vote.description = 'Testing';
      vote.startDate = new Date();
      vote.endDate = new Date();
      vote.cat = new Date();
      vote.uat = new Date();

      const result = [ vote ];

      jest.spyOn(voteService, 'findAll').mockImplementation(async () => result);

      expect(await voteController.listAll()).toBe(result);
    });
  });
});
