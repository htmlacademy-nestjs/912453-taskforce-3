import {ApiProperty} from '@nestjs/swagger';
import {City} from '@project/shared/app-types';
import {IsISO8601, IsOptional, IsPositive, IsString, Length} from 'class-validator';
import {TASK_FIELD, VALIDATION_ERROR} from '../task.constant';

export class CreateTaskDto {
  @ApiProperty({
    description: 'Заголовок. Минимальная длина 20 символов, максимальная 50.',
    example: 'Нужно починить кран и вкутить лампочки.',
    required: true
  })
  @Length(TASK_FIELD.MinTitle,TASK_FIELD.MaxTitle, {message: VALIDATION_ERROR.TaskTitleLength})
  @IsString()
  public title: string;

  @ApiProperty({
    description: 'Описание. Минимальная длина 100 символов, максимальная: 1024 символа.',
    example: 'Вода капает (бесит), и темно как в ж..',
    required: true
  })
  @Length(TASK_FIELD.MinDescription, TASK_FIELD.MaxDescription, {message: VALIDATION_ERROR.TaskDescriptionLength})
  @IsString()
  public description: string;

  @ApiProperty({
    description: 'Название категории.',
    example: 'Ремонт'
  })
  @IsString()
  public category: string;

  @ApiProperty({
    description: 'Неотрицательное число. Сумма может быть произвольной, в том числе и нулём.',
    example: '100'
  })
  @IsOptional()
  @IsPositive()
  public price?: number;

  @ApiProperty({
    description: 'Валидная дата для выполнения задания. Выбранная дата исполнения не может быть меньше текущей даты.',
    example: '2023-05-09'
  })
  @IsOptional()
  @IsISO8601({}, {message: VALIDATION_ERROR.TaskDueDateNotValid})
  public dueDate?: Date;

  @ApiProperty({
    description: 'Максимальный размер изображения: 1 мегабайт. Допускаются форматы: jpg, png.',
    example: 'photo.jpg'
  })
  @IsOptional()
  public image?: string;

  @ApiProperty({
    description: 'Адрес, где необходимо выполнять задание. Минимальная длина 10 символов, максимальная 255.',
    example: 'ул. Улица, дом 1, к2, кв3'
  })
  @Length(TASK_FIELD.MinAddress, TASK_FIELD.MaxAddress, {message: VALIDATION_ERROR.TaskAddressLength})
  @IsString()
  public address?: string;

  @ApiProperty({
    description: 'Список тегов к заданию.',
    example: ['сантехника', 'электрика', 'разовая', 'опасная']
  })
  @IsOptional()
  @Length(TASK_FIELD.MinTag, TASK_FIELD.MaxTag, {each: true, message: VALIDATION_ERROR.TaskTagLength})
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
