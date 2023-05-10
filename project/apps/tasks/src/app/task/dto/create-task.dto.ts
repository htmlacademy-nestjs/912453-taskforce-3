import {ApiProperty} from '@nestjs/swagger';
import {City} from '@project/shared/app-types';

export class CreateTaskDto {
  @ApiProperty({
    description: 'Заголовок. Минимальная длина 20 символов, максимальная 50.',
    example: 'Нужно починить кран и вкутить лампочки.',
    required: true
  })
  public title: string;

  @ApiProperty({
    description: 'Описание. Минимальная длина 100 символов, максимальная: 1024 символа.',
    example: 'Вода капает (бесит), и темно как в ж..',
    required: true
  })
  public description: string;

  @ApiProperty({
    description: 'Название категории.',
    example: 'Ремонт'
  })
  public category: string;

  @ApiProperty({
    description: 'Неотрицательное число. Сумма может быть произвольной, в том числе и нулём.',
    example: '100'
  })
  public price?: number;

  @ApiProperty({
    description: 'Валидная дата для выполнения задания. Выбранная дата исполнения не может быть меньше текущей даты.',
    example: '2023-05-09'
  })
  public dueDate?: Date;

  @ApiProperty({
    description: 'Максимальный размер изображения: 1 мегабайт. Допускаются форматы: jpg, png.',
    example: 'photo.jpg'
  })
  public image?: string;

  @ApiProperty({
    description: 'Адрес, где необходимо выполнять задание. Минимальная длина 10 символов, максимальная 255.',
    example: 'ул. Улица, дом 1, к2, кв3'
  })
  public address?: string;

  @ApiProperty({
    description: 'Список тегов к заданию.',
    example: ['сантехника', 'электрика', 'разовая', 'опасная']
  })
  tags?: string[];

  @ApiProperty({
    description: 'Один город из списка: Moscow, SaintPetersburg, Vladivostok.',
    example: 'Moscow'
  })
  public city: City;

@ApiProperty({
  description: 'Уникальный идентификатор пользователя.',
  example: '123456'
})
public userId: string;
}
