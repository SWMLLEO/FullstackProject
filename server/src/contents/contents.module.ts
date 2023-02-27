import { Module } from '@nestjs/common';
import { ContentsService } from './contents.service';
import { ContentsController } from './contents.controller';
import { Contents } from 'src/typeorm/contents.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { View } from 'src/typeorm/view.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Contents, View])],
  controllers: [ContentsController],
  providers: [ContentsService],
})
export class ContentsModule {}
