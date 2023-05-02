import {ApiProperty} from '@nestjs/swagger';

export class ChangeUserPasswordDto {
  @ApiProperty({
    description: 'User uniq email',
    example: 'user@user.ru',
  })
  public email: string;

  @ApiProperty({
    description: 'Current password',
    example: '123456'
  })
  public password: string;

  @ApiProperty({
    description: 'New password',
    example: 'Newstrongpassword123!'
  })
  public newPassword: string;
}
