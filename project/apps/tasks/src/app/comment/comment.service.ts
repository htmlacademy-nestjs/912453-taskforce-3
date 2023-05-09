import { Injectable } from '@nestjs/common';
import {CreateCommentDto} from './dto/create-comment.dto';
import {CommentInterface} from '@project/shared/app-types';
import dayjs from 'dayjs';
import {CommentEntity} from './comment.entity';
import {CommentRepository} from './comment.repository';

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository
  ) {}

  public async create(dto: CreateCommentDto, userId: string): Promise<CommentInterface> {
    const {comment, taskId} = dto;
    const newComment = {
      comment, taskId,
      createdAt: dayjs().toDate(),
      userId
    };

    const commentEntity = await new CommentEntity(newComment);

    return this.commentRepository.create(commentEntity);
  }

  public async getCommentsByTaskId(taskId: number): Promise<CommentInterface[]> {
    return this.commentRepository.findByTaskId(taskId);
  }

  public async deleteComment(id: number): Promise<void> {
    return await this.commentRepository.destroy(id);
  }

  public async deleteAllCommentsWithTask(taskId: number): Promise<void> {
    return  await this.commentRepository.deleteAllInTask(taskId);
  }
}
