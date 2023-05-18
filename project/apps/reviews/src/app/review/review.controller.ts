import { Body, Controller, Post, Get, Delete, HttpStatus, Param } from '@nestjs/common';
import { ReviewService } from './review.service';
import { fillObject } from '@project/util/util-core';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewRdo } from './rdo/review.rdo';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('reviews')
@Controller('reviews')
export class ReviewController {
  constructor(
    private readonly reviewService: ReviewService
  ) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new review has been successfully created.',
    type: ReviewRdo
  })
  @Post('create')
  public async create(@Body() dto: CreateReviewDto) {
    const newReview = await this.reviewService.create(dto);
    return fillObject(ReviewRdo, newReview);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The review found.',
    type: ReviewRdo
  })
  @Get(':id')
  public async get(@Param('id') id: number) {
    const existReview = await this.reviewService.getReview(id);

    return fillObject(ReviewRdo, existReview);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Review found',
    type: ReviewRdo
  })
  @Get('task/:taskId')
  public async getByTask(@Param('taskId') taskId: number) {
    const existReview = await this.reviewService.getByTaskId(taskId);
    return fillObject(ReviewRdo, existReview);
  }

  @ApiResponse({
    description: 'The review has been successfully deleted.',
    status: HttpStatus.OK
  })
  @Delete('/:id')
  public async delete(@Param('id') id: number) {
    await this.reviewService.delete(id);
  }

  @ApiResponse({
    type: ReviewRdo,
    status: HttpStatus.OK,
    description: 'The reviews found.'
  })
  @Get('contractor/:contractorId')
  async getContractorReviews(@Param('contractorId') contractorId: string) {
    const reviews = await this.reviewService.getByContractorId(contractorId);
    return fillObject(ReviewRdo, reviews);
  }

  @ApiResponse({
    status: HttpStatus.OK,
  })
  @Get('contractor/:contractorId/rating')
  public async getContractorRating(@Param('contractorId') contractorId: string) {
    return this.reviewService.getRating(contractorId);
  }
}
