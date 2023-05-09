import { Expose } from 'class-transformer';
import {ApiProperty} from '@nestjs/swagger';

export class TagRdo {
  @ApiProperty({
    description: 'Уникальный идентификатор тега',
    example: '3',
    required: true
  })
  @Expose()
  public id: number ;

  @ApiProperty({
    description: 'Наименование тега',
    example: 'опасная',
    required: true
  })
  @Expose()
  public name: string;
}
