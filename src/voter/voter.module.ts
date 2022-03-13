import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { VoterController } from './voter.controller';
import Voter from './voter.entity';
import { VoterService } from './voter.service';

@Module({
  imports: [TypeOrmModule.forFeature([Voter]), forwardRef(() => AuthModule)],
  controllers: [VoterController],
  providers: [VoterService],
  exports: [VoterService],
})
export class VoterModule {}
