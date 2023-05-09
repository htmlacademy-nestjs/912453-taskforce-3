import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import {CommentRepository} from './comment.repository';
import {PrismaModule} from '../prisma/prisma.module';

@Module({
  controllers: [CommentController],
  providers: [CommentService, CommentRepository],
  exports: [CommentService],
  imports: [PrismaModule]
})
export class CommentModule {}
