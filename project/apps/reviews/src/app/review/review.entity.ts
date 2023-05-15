import { ReviewInterface } from '@project/shared/app-types';

export class ReviewEntity implements ReviewInterface {
  public id: number;
  public taskId: number;
  public userId: string;
  public review: string;
  public rating: number;
  public contractorId: string;
  public createdAt: Date;

  constructor(review: ReviewInterface) {
    this.fillEntity(review);
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(review: ReviewInterface) {
    this.id = review.id;
    this.taskId = review.taskId;
    this.userId = review.userId;
    this.review = review.review;
    this.rating = review.rating;
    this.contractorId = review.contractorId;
    this.createdAt = review.createdAt;
  }
}
