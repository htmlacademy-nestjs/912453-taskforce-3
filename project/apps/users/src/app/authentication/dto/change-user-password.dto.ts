import {ApiProperty} from '@nestjs/swagger';

export class ChangeUserPasswordDto {

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
