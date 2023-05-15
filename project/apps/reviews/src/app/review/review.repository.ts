import { Injectable } from '@nestjs/common';
import { CRUDRepositoryInterface } from '@project/util/util-types';
import { ReviewEntity } from './review.entity';
import {ReviewInterface} from '@project/shared/app-types';
import {PrismaService} from '../prisma/prisma.service';

@Injectable()
export class ReviewRepository implements CRUDRepositoryInterface<ReviewEntity, number, ReviewInterface> {
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: ReviewEntity): Promise<ReviewInterface> {
    const entityData = item.toObject();
    return this.prisma.review.create({
      data: {
        ...entityData,
      },
    });
  }


  public findById(id: number): Promise<ReviewInterface | null> {
    return this.prisma.review.findFirst({
      where: {
        id
      }
    });
  }

  public findByTaskId(taskId: number): Promise<ReviewInterface | null> {
    return this.prisma.review.findFirst({
      where: {
        taskId
      }
    });
  }

  public findByContractorId(contractorId: string): Promise<ReviewInterface[]> {
    return this.prisma.review.findMany({
      where: {
        contractorId: contractorId,
      },
    });
  }

  public async getContractorRatingSum (contractorId: string): Promise<number> {
    const ratingSum = await this.prisma.review.aggregate({
      _sum: {
        rating: true,
      },
      where: {
        contractorId: contractorId,
      },
    });
    return ratingSum._sum.rating;
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.review.delete({
      where: {
        id,
      }
    });
  }

  public async destroyByContractorId(contractorId: string): Promise<void> {
    await this.prisma.review.deleteMany({
      where: {
        contractorId,
      }
    });
  }

  public update(reviewId: number, item: ReviewEntity): Promise<ReviewInterface> {
    return Promise.resolve(undefined);
  }
}
