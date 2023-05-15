import {Expose} from "class-transformer";
import {ApiProperty} from "@nestjs/swagger";

export class ReviewRdo {
  @ApiProperty({
    description: 'Уникальный идентификатор отзыва.',
    example: '1'
  })
  @Expose({name: 'id'})
  public id: number;

  @ApiProperty({
    description: 'Уникальный идентификатор задания.',
    example: '1'
  })
  @Expose()
  public taskId: number;

  @ApiProperty({
    description: 'Уникальный идентификатор пользователя.',
    example: 'd913b9e8-9ff5-4528-8fc6-4d0ffd1e0ad3'
  })
  @Expose()
  public userId: string;

  @ApiProperty({
    description: 'Текст отзыва.',
    example: 'Золотые руки!',
  })
  @Expose()
  public review: string;

  @ApiProperty({
    description: 'Оценка исполнителя от 1 до 5',
    example: '4'
  })
  @Expose()
  public rating: number;

  @ApiProperty({
    description: 'Уникальный идентификатор исполнителя.',
    example: '123456'
  })
  @Expose()
  public contractorId: string;

  @ApiProperty({
    description: 'Дата отзыва',
    example: '2023-05-14'
  })
  @Expose()
  public createdAt: Date;
}
