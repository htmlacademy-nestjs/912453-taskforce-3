export interface CommentInterface {
  id?: number;
  comment: string;
  taskId: number;
  userId: string;
  createdAt?: Date;
}
