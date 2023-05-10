import { TaskStatus } from '@project/shared/app-types';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskStatusDto {
  @ApiProperty({
    description: 'Один из статусов: Canceled, InProgress, Completed, Failed.',
    example: 'InProgress'
  })
  public status: TaskStatus;

  @ApiProperty({
    description: 'Уникальный идентификатор пользователя.',
    example: '123456'
  })
  public userId: string;
}
