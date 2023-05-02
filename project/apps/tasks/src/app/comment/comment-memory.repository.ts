import {CRUDRepositoryInterface} from '@project/util/util-types';
import {CommentInterface} from '@project/shared/app-types';
import * as crypto from 'crypto';
import {Injectable} from '@nestjs/common';
import {CommentEntity} from './comment.entity';

@Injectable()
export class CommentMemoryRepository implements CRUDRepositoryInterface<CommentEntity, string, CommentInterface> {
  private repository: {[key: string]: CommentInterface} = {};

  public async create(item: CommentEntity): Promise<CommentInterface> {
    const entry = {...item.toObject(), _id: crypto.randomUUID()};
    this.repository[entry._id] = entry;
    return entry;
  }

  public async findById(id: string): Promise<CommentInterface | null> {
    return {...this.repository[id]} ?? null;
  }

  public async findByTaskId(taskId: string): Promise<CommentInterface[]> {
    return  Object.values(this.repository)
      .filter((comment) => comment.taskId === taskId);
  }

  public async destroyAllWithTask(taskId: string): Promise<void> {
    Object.values(this.repository).forEach((comment) => {
      if(comment.taskId === taskId) {
        delete this.repository[comment._id];
      }
    });
  }

  public async destroy(id: string): Promise<void> {
    delete this.repository[id];
  }

  public async update(id: string, item: CommentEntity): Promise<CommentInterface> {
    this.repository[id] = {...item.toObject(), _id: id};
    return this.findById(id);
  }
}
