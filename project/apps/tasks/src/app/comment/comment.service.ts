import {Injectable} from '@nestjs/common';
import {CreateCommentDto} from './dto/create-comment.dto';
import {CommentInterface} from '@project/shared/app-types';
import dayjs from 'dayjs';
import {CommentEntity} from './comment.entity';
import {CommentRepository} from './comment.repository';
import {TaskService} from '../task/task.service';

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly taskService: TaskService
  ) {}

  public async create(dto: CreateCommentDto): Promise<CommentInterface> {
    const {comment, taskId, userId} = dto;
    const newComment = {
      comment, taskId,
      createdAt: dayjs().toDate(),
      userId
    };

    const commentEntity = await new CommentEntity(newComment);
    await this.taskService.incrementCommentsCounter(taskId, +1);
    return this.commentRepository.create(commentEntity);
  }

  public async getCommentsByTaskId(taskId: number): Promise<CommentInterface[]> {
    return this.commentRepository.findByTaskId(taskId);
  }

  public async deleteComment(id: number): Promise<void> {
    const comment = await this.commentRepository.findById(id)
    const taskId = comment.taskId;
    await this.commentRepository.destroy(id);
    await this.taskService.incrementCommentsCounter(taskId, -1);
  }
}
