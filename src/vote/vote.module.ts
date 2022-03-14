import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SecurityModule } from 'src/security/security.module';
import { VoteController } from './vote.controller';
import Vote from './vote.entity';
import { VoteService } from './vote.service';

@Module({
  imports: [TypeOrmModule.forFeature([Vote]), SecurityModule],
  providers: [VoteService],
  controllers: [VoteController],
  exports: [VoteService],
})
export class VoteModule {}
