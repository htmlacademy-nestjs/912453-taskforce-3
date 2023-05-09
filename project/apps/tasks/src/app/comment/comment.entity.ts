import {CommentInterface} from '@project/shared/app-types';
import dayjs from 'dayjs';

export class CommentEntity implements CommentInterface {
  public id?: number;
  public comment: string;
  public taskId: number;
  public userId: string;
  public createdAt?: Date;

  constructor(comment: CommentInterface) {
    this.fillEntity(comment);
    // this.createdAt = dayjs().toDate();
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(comment: CommentInterface) {
    this.id = comment.id;
    this.comment = comment.comment;
    this.taskId = comment.taskId;
    this.userId = comment.userId;
    // this.createdAt = comment.createdAt;
  }

}
