import {ApiProperty} from "@nestjs/swagger";
import {Transform} from 'class-transformer';
import {IsInt, IsString, Length, Max, Min} from 'class-validator';
import {REVIEW, REVIEW_VALID} from "../review.constant";

export class CreateReviewDto {
  @ApiProperty({
    description: 'Текст отзыва. Минимум 50 символов, максимум 500 символов.',
    example: 'Золотые руки!',
  })
  @Length(REVIEW.MIN_LENGTH, REVIEW.MAX_LENGTH, { message: REVIEW_VALID.LENGTH_VALID })
  @IsString()
  public review: string;

  @ApiProperty({
    description: 'Уникальный идентификатор задания.',
    example: '1'
  })
  @Transform(({value}) => +value)
  public taskId: number;

  @ApiProperty({
    description: 'Уникальный идентификатор исполнителя.',
    example: '123456'
  })
  public contractorId: string;

  @ApiProperty({
    description: 'Уникальный идентификатор пользователя.',
    example: '123456'
  })
  public userId: string;

  @ApiProperty({
    description: 'Оценка исполнителя от 1 до 5',
    example: '4'
  })
  @Min(REVIEW.MIN_RATING, {message: REVIEW_VALID.RATING_VALID})
  @Max(REVIEW.MAX_RATING, {message: REVIEW_VALID.RATING_VALID})
  @IsInt()
  public rating: number;
}
