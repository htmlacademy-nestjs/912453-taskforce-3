import {ApiProperty} from '@nestjs/swagger';

export class CreateTagDto {
  @ApiProperty({
    description: 'Теги к заданию. Одно слово. Максимальное количество тегов к заданию: 5 штук.',
    example: 'неинтим',
    required: true
  })
  public name: string;
}

