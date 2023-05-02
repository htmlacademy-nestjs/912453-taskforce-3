import {City, UserRole} from '@project/shared/app-types';
import {ApiProperty} from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'User unique address',
    example: 'user@user.ru'
  })
  public email: string;

  @ApiProperty({
    description: 'User birth date',
    example: '1981-03-12',

  })
  public dateBirth: Date;

  @ApiProperty({
    description: 'User full name',
    example: 'Keks',
  })
  public name: string;

  @ApiProperty({
    description: 'About user',
    example: 'Cat',
  })
  public about?: string;

  @ApiProperty({
    enum: City,
    description: 'User city',
    example: 'Санкт-Петербург',
  })
  public city: City;

  @ApiProperty({
    enum: UserRole,
    description: 'User role',
    example: 'customer',
  })
  public role: UserRole;

  @ApiProperty({
    description: 'User avatar filepath',
    example: '/avatar.png',
  })
  public avatar?: string;

  @ApiProperty({
    description: 'User password',
    example: 'PurinaOne',
  })
  public password: string;
}
