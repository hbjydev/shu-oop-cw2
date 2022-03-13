import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VoterToken } from './entities/votertoken.entity';
import { SecurityService } from './security.service';
import { VoterAuthMiddleware } from './voterAuth.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([VoterToken])],
  providers: [SecurityService, VoterAuthMiddleware],
  exports: [SecurityService, VoterAuthMiddleware],
})
export class SecurityModule {}
