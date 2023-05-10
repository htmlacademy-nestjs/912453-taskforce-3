import {Injectable} from '@nestjs/common';
import {CRUDRepositoryInterface} from '@project/util/util-types';
import {CommentInterface} from '@project/shared/app-types';
import {PrismaService} from '../prisma/prisma.service';
import {CommentEntity} from './comment.entity';

@Injectable()
export class CommentRepository implements CRUDRepositoryInterface<CommentEntity, number, CommentInterface>{
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: CommentEntity): Promise<CommentInterface> {
    console.log('new comment!');
    console.log(item);
    return this.prisma.comment.create({
      data: { ...item.toObject() }
    });
  }

  public async destroy(commentId: number): Promise<void> {
    await this.prisma.comment.delete({
      where: {
        commentId,
      }
    });
  }

  public findById(commentId: number): Promise<CommentInterface | null> {
    return this.prisma.comment.findFirst({
      where: {
        commentId
      }
    });
  }

  public find(ids: number[] = []): Promise<CommentInterface[]> {
    return this.prisma.comment.findMany({
      where: {
        commentId: {
          in: ids.length > 0 ? ids : undefined
        }
      }
    });
  }

  public update(commentId: number, item: CommentEntity): Promise<CommentInterface> {
    return this.prisma.comment.update({
      where: {
        commentId
      },
      data: { ...item.toObject(), commentId}
    });
  }

  public findByTaskId(taskId: number): Promise<CommentInterface[]> {
    console.log('taskId in repository is:', taskId);

    return this.prisma.comment.findMany({
      where: {taskId}
    });
  }

  public async deleteAllInTask(taskId: number): Promise<void> {
     this.prisma.comment.deleteMany({
      where: {taskId}
    });
  }
}
