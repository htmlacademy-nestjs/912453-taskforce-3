import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import {TaskMemoryRepository} from './task-memory.repository';
import {TaskRepository} from './task.repository';
import {CategoryModule} from '../category/category.module';
import {ResponseModule} from '../response/response.module';
import {CommentModule} from '../comment/comment.module';
import {TagModule} from '../tag/tag.module';
import {PrismaModule} from '../prisma/prisma.module';

@Module({
  imports: [CategoryModule, CommentModule, TagModule, PrismaModule],
  controllers: [TaskController],
  providers: [TaskService, TaskRepository],
  exports: [TaskService, TaskRepository]
})
export class TaskModule {}
