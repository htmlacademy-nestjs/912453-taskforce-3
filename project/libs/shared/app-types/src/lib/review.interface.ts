export interface ReviewInterface {
  id?: number;
  taskId: number;
  userId: string;
  review: string;
  rating: number;
  contractorId: string;
  createdAt: Date;
}
