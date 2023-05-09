import {ApiProperty} from '@nestjs/swagger';

export class UpdateCategoryDto {
  @ApiProperty({
    description: 'Обновленная категория',
    example: 'Ремонтные работы',
    required: true
  })
  public title: string;
}
