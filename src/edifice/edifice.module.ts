import { Module } from '@nestjs/common';
import { EdificeService } from './edifice.service';
import { EdificeController } from './edifice.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EdificeEntity } from 'src/models/edifice/Edifice.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([EdificeEntity])
  ],
  providers: [EdificeService],
  controllers: [EdificeController]
})
export class EdificeModule {}
