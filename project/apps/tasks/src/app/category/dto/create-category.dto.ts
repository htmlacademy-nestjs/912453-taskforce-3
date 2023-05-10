import {ApiProperty} from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'Категория заданий. Название не может повторяться (дубли не сохраняются).',
    example: 'Ремонт',
    required: true
  })
  public title: string;
}
