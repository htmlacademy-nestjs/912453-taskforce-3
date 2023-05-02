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
    example: 'ec490a56-d2a4-4ddb-b3e2-f3d6fd65ecb1',
    required: true
  })
  public taskId: string;
}
