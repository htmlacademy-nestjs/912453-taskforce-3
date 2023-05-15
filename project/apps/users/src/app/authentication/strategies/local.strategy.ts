import {Injectable} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {AuthenticationService} from '../authentication.service';
import {Strategy} from 'passport-local';
import {UserEntity} from '../../user/user.entity';

const USERNAME_FIELD_NAME = 'email';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthenticationService) {
    super({ usernameField: USERNAME_FIELD_NAME });
  }

  public async validate(email: string, password: string): Promise<UserEntity> {
    return this.authService.verifyUser({email, password})
  }
}
