import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SecurityModule } from 'src/security/security.module';
import { VoterController } from './voter.controller';
import Voter from './voter.entity';
import { VoterService } from './voter.service';

@Module({
  imports: [TypeOrmModule.forFeature([Voter]), SecurityModule],
  controllers: [VoterController],
  providers: [VoterService],
})
export class VoterModule {}
