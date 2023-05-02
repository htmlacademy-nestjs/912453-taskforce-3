import {ApiProperty} from '@nestjs/swagger';
import {Expose} from 'class-transformer';

export class CommentRdo {
  @ApiProperty({
    description: 'Новый комментарий. Минимальная длина: 10 символов, максимальная: 300.',
    example: 'Что за тяги такие, бархатные тяги, ребята? Уффф. Кефтеме',
    required: true
  })
  @Expose()
  public comment: string;

  @ApiProperty({
    description: 'Уникальный Id задачи',
    example: 'ec490a56-d2a4-4ddb-b3e2-f3d6fd65ecb1',
    required: true
  })
  @Expose()
  public taskId: string;

  @ApiProperty({
    description: 'Уникальный Id автора комментария',
    example: 'ec490a56-d2a4-4ddb-b3e2-f3d6fd65ecb3',
    required: true
  })
  @Expose()
  public userId: string;

  @ApiProperty({
    description: 'Дата создания комментария',
    example: '2023-04-01',
    required: true
  })
  @Expose()
  public publicDate: Date;
}
