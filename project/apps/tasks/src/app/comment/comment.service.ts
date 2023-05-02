import { Injectable } from '@nestjs/common';
import {CommentMemoryRepository} from './comment-memory.repository';
import {CreateCommentDto} from './dto/create-comment.dto';
import {CommentInterface} from '@project/shared/app-types';
import dayjs from 'dayjs';
import {CommentEntity} from './comment.entity';

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentMemoryRepository
  ) {}

  public async create(dto: CreateCommentDto, userId: string): Promise<CommentInterface> {
    const {comment, taskId} = dto;

    const newComment = {
      comment, taskId,
      publicDate: dayjs().toDate(),
      userId
    };

    const commentEntity = await new CommentEntity(newComment);

    return this.commentRepository.create(commentEntity);
  }

  public async getCommentsByTaskId(taskId: string): Promise<CommentInterface[]> {
    return this.commentRepository.findByTaskId(taskId);
  }

  public async deleteComment(id: string): Promise<void> {
    return await this.commentRepository.destroy(id);
  }

  public async deleteAllCommentsWithTask(taskId: string): Promise<void> {
    return  await this.commentRepository.destroyAllWithTask(taskId);
  }
}
