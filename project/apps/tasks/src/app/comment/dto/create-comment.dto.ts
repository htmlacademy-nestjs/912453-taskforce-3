import {ApiProperty} from '@nestjs/swagger';
import {IsNumber, IsString, Length} from 'class-validator';
import {Transform} from 'class-transformer';
import {COMMENT_LENGTH, COMMENT_VALIDATION_ERRORS} from '../comment.constant';

export class CreateCommentDto {
  @ApiProperty({
    description: 'Новый комментарий. Минимальная длина: 10 символов, максимальная: 300.',
    example: 'Что за тяги такие, бархатные тяги, ребята? Уффф. Кефтеме',
    required: true
  })
  @Length(COMMENT_LENGTH.Min, COMMENT_LENGTH.Max, { message: COMMENT_VALIDATION_ERRORS.CommentLength })
  @IsString()
  public comment: string;

  @ApiProperty({
    description: 'Уникальный Id задачи',
    example: 1,
    required: true
  })
  @IsNumber()
  @Transform(({ value } ) => +value)
  public taskId: number;

  @ApiProperty({
    description: 'Уникальный Id пользователя',
    example: 1,
    required: true
  })
  public userId: string;
}
