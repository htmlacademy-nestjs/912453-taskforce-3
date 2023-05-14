import {ApiProperty} from '@nestjs/swagger';
import {IsNumber, IsString} from 'class-validator';
import {Transform} from 'class-transformer';

export class CreateCommentDto {
  @ApiProperty({
    description: 'Новый комментарий. Минимальная длина: 10 символов, максимальная: 300.',
    example: 'Что за тяги такие, бархатные тяги, ребята? Уффф. Кефтеме',
    required: true
  })
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
