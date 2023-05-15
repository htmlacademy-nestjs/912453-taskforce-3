import dayjs from 'dayjs';
import {Injectable} from '@nestjs/common';
import {ReviewRepository} from './review.repository';
import {CreateReviewDto} from './dto/create-review.dto';
import {ReviewEntity} from './review.entity';

@Injectable()
export class ReviewService {
  constructor(
    private readonly reviewRepository: ReviewRepository
  ) {}

  public async create(dto: CreateReviewDto) {
    const newReview = {...dto, createdAt: dayjs().toDate()};
    const reviewEntity = await new ReviewEntity(newReview);
    return this.reviewRepository.create(reviewEntity);
  }

  public async getReview(id: number) {
    return this.reviewRepository.findById(id);
  }

  public async getByTaskId(taskId: number) {
    return this.reviewRepository.findByTaskId(taskId);
  }

  public async getByContractorId(contractorId: string) {
    return this.reviewRepository.findByContractorId(contractorId);
  }

  public async getRating(contractorId: string) {
    return this.reviewRepository.getContractorRatingSum(contractorId);
  }

  public async delete(id: number) {
    return this.reviewRepository.destroy(id);
  }

  public async deleteByContractorId(contractorId: string) {
    return this.reviewRepository.destroyByContractorId(contractorId);
  }

}
