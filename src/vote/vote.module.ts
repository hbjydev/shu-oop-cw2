import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SecurityModule } from 'src/security/security.module';
import { VoterAuthMiddleware } from 'src/security/voterAuth.middleware';
import { VoteController } from './vote.controller';
import Vote from './vote.entity';
import { VoteService } from './vote.service';

@Module({
  imports: [TypeOrmModule.forFeature([Vote]), SecurityModule],
  providers: [VoteService],
  controllers: [VoteController],
})
export class VoteModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(VoterAuthMiddleware).forRoutes('vote/:id');
  }
}
