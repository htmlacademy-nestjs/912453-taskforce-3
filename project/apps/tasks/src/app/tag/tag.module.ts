import { Module } from '@nestjs/common';
import {TagController} from './tag.controller';
import {TagService} from './tag.service';
import {TagRepository} from './tag.repository';
import {PrismaModule} from '../prisma/prisma.module';

@Module({
  controllers: [TagController],
  providers: [TagService, TagRepository],
  exports: [TagService],
  imports: [PrismaModule]
})
export class TagModule {
}
