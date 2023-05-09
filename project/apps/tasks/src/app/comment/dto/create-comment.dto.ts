import {ApiProperty} from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({
    description: 'Новый комментарий. Минимальная длина: 10 символов, максимальная: 300.',
    example: 'Что за тяги такие, бархатные тяги, ребята? Уффф. Кефтеме',
    required: true
  })
  public comment: string;

  @ApiProperty({
    description: 'Уникальный Id задачи',
    example: 1,
    required: true
  })
  public taskId: number;
}
