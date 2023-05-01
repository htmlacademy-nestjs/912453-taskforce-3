import {CommentInterface} from '@project/shared/app-types';
import dayjs from 'dayjs';

export class CommentEntity implements CommentInterface {
  public _id?: string;
  public comment: string;
  public taskId: string;
  public userId: string;
  public publicDate?: Date;

  constructor(comment: CommentInterface) {
    this.fillEntity(comment);
    this.publicDate = dayjs().toDate();
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(comment: CommentInterface) {
    this._id = comment._id;
    this.taskId = comment.taskId;
    this.userId = comment.userId;
    this.publicDate = comment.publicDate;
  }

}
