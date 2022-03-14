import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VoteModule } from 'src/vote/vote.module';
import { BallotController } from './ballot.controller';
import { Ballot } from './ballot.entity';
import { BallotService } from './ballot.service';

@Module({
  imports: [TypeOrmModule.forFeature([Ballot]), VoteModule],
  providers: [BallotService],
  controllers: [BallotController],
})
export class BallotModule {}
