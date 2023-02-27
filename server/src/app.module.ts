import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ChallengeModule } from './challenge/challenge.module';
import { ContentsModule } from './contents/contents.module';
import entities from './typeorm/entities';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'database',
      database: 'poplt',
      entities: entities,
      synchronize: true,
    }),
    UsersModule,
    ChallengeModule,
    ContentsModule,
  ],
})
export class AppModule {}
