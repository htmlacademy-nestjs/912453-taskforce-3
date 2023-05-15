import { IsEmail, IsNotEmpty } from 'class-validator';
import { UserRole } from '@project/shared/app-types';
import { EMAIL_NOT_VALID, NAME_IS_EMPTY } from '../email-subscriber.constant';

export class CreateSubscriberDto {
  @IsEmail({}, { message: EMAIL_NOT_VALID })
  public email: string;

  @IsNotEmpty({ message: NAME_IS_EMPTY })
  public name: string;

  public role: UserRole;
}
