import {Expose, Transform} from 'class-transformer';
import {ApiProperty} from '@nestjs/swagger';
import {CategoryInterface, City, TagInterface, TaskStatus} from '@project/shared/app-types';

export class TaskRdo {
  @ApiProperty({
    description: 'Уникальный id задачи.',
    example: 12334546
  })
  @Expose()
  public taskId: number;

  @ApiProperty({
    description: 'Заголовок.',
    example: 'Нужно починить кран и вкутить лампочки.'
  })
  @Expose()
  public title: string;

  @ApiProperty({
    description: 'Описание',
    example: 'Вода капает (бесит), и темно как в ж...'
  })
  @Expose()
  public description: string;

  @ApiProperty({
    description: 'Одна из существующих категорий.',
    example: 'Работа по дому'
  })
  @Expose()
  public category: CategoryInterface;

  @ApiProperty({
    description: 'Стоимость.',
    example: '100'
  })
  @Expose()
  public price: number;

  @ApiProperty({
    description: 'Валидная дата для выполнения задания.',
    example: '2023-05-14'
  })
  @Expose()
  public dueDate: Date;

  @ApiProperty({
    description: 'Изображение. Допускаются форматы: jpg, png.',
    example: 'photo.jpg'
  })
  @Expose()
  public image: string;

  @ApiProperty({
    description: 'Адрес, где необходимо выполнять задание.',
    example: 'ул. Улица, дом 1, к2, кв 3'
  })
  @Expose()
  public address: string;

  @ApiProperty({
    description: 'Список тегов к заданию. ',
    example: ['сантехника', 'электрика', 'разовая', 'опасная'],
  })
  @Expose()
  @Transform(({ value }) => value.map((tag) => tag.name))
  public tags: TagInterface[];

  @ApiProperty({
    description: 'Один город из списка: Москва, Санкт-Петербург, Владивосток.',
    example: 'Санкт-Петербург'
  })
  @Expose()
  public city: City;

  @ApiProperty({
    description: 'Одно из пяти статусов: Новое, Отменено, В работе, Выполнено, Провалено.',
    example: 'Новое'
  })
  @Expose()
  public status: TaskStatus;

  @ApiProperty({
    description: 'Количество отликов.',
    example: ''
  })
  @Expose()
  public responsesCont: number;

  @ApiProperty({
    description: 'Количество комментариев.',
    example: ''
  })
  @Expose()
  public commentsCount: number;

  @ApiProperty({
    description: 'Дата создания.',
    example: '2023-04-01'
  })
  @Expose()
  public createdAt: Date;

  @ApiProperty({
    description: 'ID пользователя.',
    example: 'ff8475938475938475'
  })
  @Expose()
  public userId: string;


}
