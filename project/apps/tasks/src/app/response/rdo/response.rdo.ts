import { Expose } from 'class-transformer';
import {ApiProperty} from '@nestjs/swagger';

export class ResponseRdo {
  @ApiProperty({
    description: 'Уникальный идентификатор отклика',
    example: '1',
    required: true
  })
  @Expose()
  public id: number;

  @ApiProperty({
    description: 'Уникальный идентификатор задания',
    example: '2',
    required: true
  })
  @Expose()
  public taskId: number;

  @ApiProperty({
    description: 'Уникальный идентификатор исполнителя',
    example: '2',
    required: true
  })
  @Expose()
  public contractorId: string;

  @ApiProperty({
    description: 'Цена предложенная исполнителем или цена по умолчанию (установленная заказчиком)',
    example: '99',
    required: true
  })
  @Expose()
  public offerPrice: number;
}
