import { Module } from '@nestjs/common';
import {ResponseService} from './response.service';
import {ResponseRepository} from './response.repository';
import {ResponseController} from './response.controller';
import {PrismaModule} from '../prisma/prisma.module';
import {TaskModule} from '../task/task.module';

@Module({
  controllers: [ResponseController],
  providers: [ResponseService, ResponseRepository],
  exports: [ResponseService],
  imports: [PrismaModule, TaskModule]
})
export class ResponseModule {}
