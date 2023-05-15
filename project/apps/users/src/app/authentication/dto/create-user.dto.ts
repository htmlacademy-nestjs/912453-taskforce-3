import {City, UserRole} from '@project/shared/app-types';
import {ApiProperty} from '@nestjs/swagger';
import {IsEmail, IsISO8601, IsString, Length, MaxLength} from 'class-validator';
import {
  USER_FIELDS,
  USER_VALIDATION_ERRORS
} from '../authentication.constant';

export class CreateUserDto {
  @ApiProperty({
    description: 'User unique address',
    example: 'user@user.ru',
    required: true
  })
  @IsEmail({}, { message: USER_VALIDATION_ERRORS.UserEmailNotValid })
  public email: string;

  @ApiProperty({
    description: 'User birth date',
    example: '1981-03-12'
  })
  @IsISO8601({}, { message: USER_VALIDATION_ERRORS.UserDateBirthNotValid })
  public dateBirth: Date;

  @ApiProperty({
    description: 'User full name',
    example: 'Keks',
  })
  @IsString()
  @Length(USER_FIELDS.UserNameMin, USER_FIELDS.UserNameMax, { message: USER_VALIDATION_ERRORS.UserNameLength })
  public name: string;

  @ApiProperty({
    description: 'About user',
    example: 'Cat',
    required: false
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
    required: true
  })
  @IsString()
  @Length(USER_FIELDS.PasswordMin, USER_FIELDS.PasswordMax, { message: USER_VALIDATION_ERRORS.UserPasswordLength })
  public password: string;
}
