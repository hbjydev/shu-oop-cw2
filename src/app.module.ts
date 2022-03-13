import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import * as Joi from 'joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { RoleGuard } from './auth/role.guard';
import { DatabaseModule } from './database/database.module';
import { SecurityModule } from './security/security.module';
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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
