import { Module } from '@nestjs/common';
// import {ResponseController} from '../response/response.controller';
// import {ResponseService} from '../response/response.service';
// import {ResponseRepository} from '../response/response.repository';
// import {TaskModule} from '../task/task.module';
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
