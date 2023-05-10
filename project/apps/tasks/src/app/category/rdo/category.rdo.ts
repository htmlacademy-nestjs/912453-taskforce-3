import { Expose } from 'class-transformer';
import {ApiProperty} from '@nestjs/swagger';

export class CategoryRdo {
  @ApiProperty({
    description: 'Уникальный идентификатор категории',
    example: '2',
    required: true
  })
  @Expose()
  public categoryId: string;

  @ApiProperty({
    description: 'Наименование категории',
    example: 'Ремонт',
    required: true
  })
  @Expose()
  public title: string;
}
