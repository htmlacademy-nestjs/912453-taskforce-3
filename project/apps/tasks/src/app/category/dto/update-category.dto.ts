import {ApiProperty} from '@nestjs/swagger';
import {IsString} from 'class-validator';

export class UpdateCategoryDto {
  @ApiProperty({
    description: 'Обновленная категория',
    example: 'Ремонтные работы',
    required: true
  })
  @IsString()
  public title: string;
}
