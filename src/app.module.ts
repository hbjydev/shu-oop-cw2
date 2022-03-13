import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { SecurityModule } from './security/security.module';
import { VoteModule } from './vote/vote.module';
import { VoterModule } from './voter/voter.module';

@Module({
  imports: [
    VoteModule,
    VoterModule,
    SecurityModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        PORT: Joi.number(),

        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_USER: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_DATABASE: Joi.string().required(),
      }),
    }),
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
