export interface CommentInterface {
  _id?: string;
  comment: string;
  taskId: string;
  userId: string;
  publicDate?: Date;
}
