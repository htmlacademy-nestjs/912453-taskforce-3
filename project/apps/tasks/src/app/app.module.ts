import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { CommentModule } from './comment/comment.module';
import { CategoryModule } from './category/category.module';
import { TagModule } from './tag/tag.module';
import { ResponseModule } from './response/response.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    TaskModule,
    CommentModule,
    CategoryModule,
    TagModule,
    ResponseModule,
    PrismaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
