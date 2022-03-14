import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { VoteModule } from './vote/vote.module';
import { VoterModule } from './voter/voter.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    VoteModule,
    VoterModule,
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
  providers: [AppService],
})
export class AppModule {}
