import { City } from '@project/shared/app-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsISO8601, IsString, Length, MaxLength, IsArray, ArrayMaxSize, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { SPECIALIZATIONS_LIMIT, USER_FIELDS, USER_VALIDATION_ERRORS } from '../authentication.constant';

export class UpdateUserDto {
  @ApiProperty({
    description: 'Фамилия и имя пользователя. Минимальная длина поля: 3 символа, максимальная 50 символов.',
    example: 'Ivan Ivanov',
  })
  @Length(USER_FIELDS.UserNameMin, USER_FIELDS.UserNameMax, { message: USER_VALIDATION_ERRORS.UserNameLength })
  @IsString()
  @IsOptional()
  public name?: string;

  @ApiProperty({
    description: 'Дата рождения в формате: "YYYY-MM-DD№. Ограничения: валидная дата, пользователь достиг совершеннолетия (18 лет).',
    example: '2022-02-22',
  })
  @IsISO8601({}, { message: USER_VALIDATION_ERRORS.UserDateBirthNotValid })
  @IsOptional()
  public dateBirth?: Date;

  @ApiProperty({
    description: 'Информация о себе. Максимальная длина: 300 символов',
    example: 'Мастер на все руки',
  })
  @MaxLength(USER_FIELDS.UserInfoMax, { message: USER_VALIDATION_ERRORS.UserInfoLength })
  @IsString()
  @IsOptional()
  public about?: string;

  @ApiProperty({
    description: 'Список навыков пользователя (один или несколько вариантов). Ограничения: не больше 5 вариантов.',
    example: 'Москва'
  })
  @IsArray()
  @ArrayMaxSize(SPECIALIZATIONS_LIMIT, { message: USER_VALIDATION_ERRORS.UserMaxSpecializationNumber})
  @Transform(({ value }) => new Set(value.map(item => item.toLowerCase())))
  @IsOptional()
  public specializations?: string[];

  @ApiProperty({
    description: 'Один город из списка: Москва, Санкт-Петербург, Владивосток.',
    example: 'Moscow'
  })
  @IsOptional()
  public city?: City;

  @ApiProperty({
    description: 'Фотография для аватарки пользователя. Ограничения: не больше 500 килобайт, формат jpeg или png.',
    example: 'avatar.png'
  })
  @IsOptional()
  public avatar?: string;

}
