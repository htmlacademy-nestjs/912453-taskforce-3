import {ApiProperty} from '@nestjs/swagger';
import {IsString} from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'Категория заданий. Название не может повторяться (дубли не сохраняются).',
    example: 'Ремонт',
    required: true
  })
  @IsString()
  public title: string;
}
