import { Module } from '@nestjs/common';
import { PcauthService } from './pcauth.service';
import { PcauthController } from './pcauth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PcAuthEntity } from 'src/models/pcauth/pcauth.entity';
import { EdificeEntity } from 'src/models/edifice/Edifice.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PcAuthEntity,EdificeEntity])
  ],
  providers: [PcauthService],
  controllers: [PcauthController]
})
export class PcauthModule {}
