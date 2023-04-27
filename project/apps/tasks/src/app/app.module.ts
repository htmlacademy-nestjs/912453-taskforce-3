import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [TaskModule, CommentModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
