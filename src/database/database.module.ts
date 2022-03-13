import { Module } from '@nestjs/common';
// import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      // imports: [ConfigModule],
      // inject: [ConfigService],

      useFactory: async (/*configService: ConfigService*/) => ({
        ...(await getConnectionOptions()),
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class DatabaseModule {}
