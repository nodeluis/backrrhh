import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudyEntity } from 'src/models/study/Study.entity';
import { StudyController } from './study.controller';
import { StudyService } from './study.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([StudyEntity])
  ],
  controllers: [StudyController],
  providers: [StudyService]
})
export class StudyModule {}
