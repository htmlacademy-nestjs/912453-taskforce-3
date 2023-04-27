import { Expose } from 'class-transformer';
import { City, UserRole } from '@project/shared/app-types';
import {ApiProperty} from '@nestjs/swagger';

export class UserRdo {
  @ApiProperty({
    description: 'The uniq user ID',
    example: '13'
  })
  @Expose({ name: '_id'})
  public id: string;

  @ApiProperty({
    description: 'User full name',
    example: 'Keks'
  })
  @Expose()
  public name: string;

  @ApiProperty({
    description: 'User email',
    example: 'user@user.local'
  })
  @Expose()
  public email: string;

  @ApiProperty({
    enum: City,
    description: 'User city',
    example: 'Сфнкт-Петербург'
  })
  @Expose()
  public city: City;

  @ApiProperty({
    enum: UserRole,
    description: 'User role',
    example: 'customer'
  })
  @Expose()
  public role: UserRole;

  @ApiProperty({
    description: 'User avatar path',
    example: '/user.png'
  })
  @Expose()
  public avatar: string;

  @ApiProperty({
    description: 'User date birth (ISO format)',
    example: '1981-03-12'
  })
  @Expose()
  public dateBirth: string;
}
