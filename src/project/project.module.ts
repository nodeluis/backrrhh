import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectEntity } from 'src/models/project/Project.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProjectEntity])
  ],
  providers: [ProjectService],
  controllers: [ProjectController]
})
export class ProjectModule {}
